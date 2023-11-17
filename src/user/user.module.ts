import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CoreModule } from '../core/core.module';

@Module({
  imports: [CoreModule],
  controllers: [UserController],
})
export class UserModule {}
