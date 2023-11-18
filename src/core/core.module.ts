import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './services/user.service';
import { User } from './entities/user.entity';
import { Product } from './entities/product.entity';
import { RolesGuard } from './guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { ProductService } from './services/product.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Product])],
  providers: [
    UserService,
    ProductService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [UserService, ProductService],
})
export class CoreModule {}
