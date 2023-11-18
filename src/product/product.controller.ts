import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Product } from '../core/entities/product.entity';
import { Public } from '../shared/decorators/is-public.decorator';
import { ReqUser } from '../shared/decorators/req-user.decorator';
import { UserRole } from '../shared/enums/user-role.enum';
import { CreateProductDto } from './dto/create-product.dto';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Public()
  @Get('')
  async getProducts(): Promise<Product[]> {
    return this.productService.find({});
  }

  @ApiBearerAuth()
  @Get(':id')
  async getProduct(@Param('id') id: string): Promise<Product> {
    return this.productService.findOne({ where: { id: Number(id) } });
  }

  @ApiBearerAuth()
  @Post()
  async createProduct(
    @Body() body: CreateProductDto,
    @ReqUser() user: { id: number; role: UserRole },
  ): Promise<Product> {
    return this.productService.create({ ...body, user: { id: user.id } });
  }

  @ApiBearerAuth()
  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() body: any,
  ): Promise<Product> {
    return this.productService.update(Number(id), body);
  }

  @ApiBearerAuth()
  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<{ status: string }> {
    const result = await this.productService.delete(Number(id));
    if (result) {
      return { status: 'ok' };
    }
  }
}
