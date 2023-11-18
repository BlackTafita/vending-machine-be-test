import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Product } from '../core/entities/product.entity';
import { Public } from '../shared/decorators/is-public.decorator';
import { ReqUser } from '../shared/decorators/req-user.decorator';
import { UserRole } from '../shared/enums/user-role.enum';

@ApiTags('Product')
@ApiBearerAuth()
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Public()
  @Get('')
  async getProducts(): Promise<Product[]> {
    return this.productService.find({});
  }

  @Get(':id')
  async getProduct(@Param('id') id: string): Promise<Product> {
    return this.productService.findOne({ where: { id: Number(id) } });
  }

  @Post()
  async createProduct(
    @Body() body: any,
    @ReqUser() user: { id: number; role: UserRole },
  ): Promise<Product> {
    return this.productService.create({ ...body, user: { id: user.id } });
  }
}
