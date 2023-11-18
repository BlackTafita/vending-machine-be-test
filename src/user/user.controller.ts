import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from '../core/services/user.service';
import { User } from '../core/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from '../shared/decorators/is-public.decorator';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  async getUsers(): Promise<User[]> {
    return this.userService.find({});
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    return this.userService.findOne({ where: { id: Number(id) } });
  }

  @Public()
  @Post()
  async createUser(@Body() user: CreateUserDto): Promise<User> {
    return this.userService.create(user);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<{ status: string }> {
    const result = await this.userService.delete(Number(id));
    if (result) {
      return { status: 'ok' };
    }
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(Number(id), body);
  }
}
