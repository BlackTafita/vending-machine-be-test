import { Module } from '@nestjs/common';
import { BuyerController } from './buyer.controller';
import { BuyerService } from './buyer.service';
import { CoreModule } from '../core/core.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../core/entities/product.entity';
import { User } from '../core/entities/user.entity';

@Module({
  imports: [CoreModule, TypeOrmModule.forFeature([User, Product])],
  controllers: [BuyerController],
  providers: [BuyerService],
})
export class BuyerModule {}
