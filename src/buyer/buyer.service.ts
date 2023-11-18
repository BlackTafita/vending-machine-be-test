import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../core/services/user.service';
import { ProductService } from '../core/services/product.service';
import { CoinValue, CoinValuesArr } from '../shared/utils/coin-value';
import { BuyProductDto } from './dto/buy-product.dto';
import { MoreThan } from 'typeorm';
import { Product } from '../core/entities/product.entity';

@Injectable()
export class BuyerService {
  constructor(
    private userService: UserService,
    private productService: ProductService,
  ) {}

  async deposit(userId: number, deposit: CoinValue): Promise<boolean> {
    const user = await this.userService.findOne({
      where: { id: userId },
      select: { deposit: true },
    });
    const updated = await this.userService.update(userId, {
      deposit: user.deposit + deposit,
    });

    return !!updated;
  }

  async buyProduct(
    data: BuyProductDto,
    userId: number,
  ): Promise<{
    product: Product;
    change: number[];
    spent: number;
  }> {
    const product = await this.productService.findOne({
      where: {
        id: data.productId,
        amountAvailable: MoreThan(0),
      },
    });
    if (!product) {
      throw new HttpException(
        'The product not find or not available',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const user = await this.userService.findOne({
      where: {
        id: userId,
      },
    });

    const fullPrice = product.cost * data.count;
    const change = user.deposit - fullPrice;
    if (change < 0) {
      throw new HttpException(
        'Not enough credits to make a purchase',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const productsLeft = product.amountAvailable - data.count;
    if (productsLeft < 0) {
      throw new HttpException(
        'Not enough products to make a purchase',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const updatedProduct = await this.productService.update(product.id, {
      amountAvailable: productsLeft,
    });

    await this.userService.update(user.id, {
      deposit: change,
    });

    return {
      product: updatedProduct,
      spent: fullPrice,
      change: this.calculateChange(change),
    };
  }

  calculateChange(val: number): number[] {
    const res: number[] = [];

    CoinValuesArr.sort((a, b) => b - a).forEach((el) => {
      const remainder = val % el;
      if (remainder < val) {
        const coinsCount = (val - remainder) / el;
        const coins = Array(coinsCount).fill(el);
        res.push(...coins);
        val = remainder;
      }
    });

    return res;
  }
}
