import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../core/entities/user.entity';
import { Product } from '../core/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Product])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
