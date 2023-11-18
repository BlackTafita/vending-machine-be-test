import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../core/entities/product.entity';
import { User } from '../core/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, User])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
