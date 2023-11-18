import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ReqUser } from '../shared/decorators/req-user.decorator';
import { BuyerService } from './buyer.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DepositDto } from './dto/deposit.dto';
import { Roles } from '../shared/decorators/roles.decorator';
import { UserRole } from '../shared/enums/user-role.enum';
import { BuyProductDto } from './dto/buy-product.dto';
import { Product } from '../core/entities/product.entity';

@ApiTags('Vending')
@ApiBearerAuth()
@Roles(UserRole.BUYER)
@Controller('')
export class BuyerController {
  constructor(private vendingService: BuyerService) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('deposit')
  async deposit(
    @Body() body: DepositDto,
    @ReqUser() user: { id: number; role: UserRole },
  ): Promise<void> {
    await this.vendingService.deposit(Number(user.id), body.coin);
  }

  @Post('buy')
  async buy(
    @Body() body: BuyProductDto,
    @ReqUser() user: { id: number; role: UserRole },
  ): Promise<{
    product: Product;
    change: number[];
    spent: number;
  }> {
    return this.vendingService.buyProduct(body, user.id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Get('reset')
  async resetDeposit(
    @ReqUser() user: { id: number; role: UserRole },
  ): Promise<void> {
    await this.vendingService.resetDeposit(user.id);
  }
}
