import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../core/entities/product.entity';
import { User } from '../core/entities/user.entity';
import { CoreModule } from '../core/core.module';

@Module({
  imports: [CoreModule, TypeOrmModule.forFeature([Product, User])],
  controllers: [ProductController],
})
export class ProductModule {}
