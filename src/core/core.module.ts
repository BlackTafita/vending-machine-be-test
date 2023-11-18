import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './services/user.service';
import { User } from './entities/user.entity';
import { Product } from './entities/product.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Product]),
    JwtModule.register({
      global: true,
      secret: `${process.env.JWT_SECRET}`,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [UserService],
  exports: [UserService],
})
export class CoreModule {}
