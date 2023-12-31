import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './core/entities/user.entity';
import { Product } from './core/entities/product.entity';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { CoreModule } from './core/core.module';
import { BuyerModule } from './buyer/buyer.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [User, Product],
      migrationsTableName: '_migrations',
    }),

    AuthModule,
    UserModule,
    ProductModule,
    CoreModule,
    BuyerModule,
  ],
})
export class AppModule {}
