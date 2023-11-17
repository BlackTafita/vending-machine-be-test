import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeepPartial,
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(search: FindOneOptions<User>): Promise<User> {
    return this.usersRepository.findOne(search);
  }

  async find(search: FindManyOptions<User>): Promise<User[]> {
    return this.usersRepository.find(search);
  }

  async create(data: DeepPartial<User>): Promise<User> {
    const user = this.usersRepository.create(data);
    return this.usersRepository.save(user);
  }

  async update(id: number, updateData: DeepPartial<User>): Promise<User> {
    const update = await this.usersRepository.update({ id }, updateData);

    if (update?.affected) {
      return this.usersRepository.findOne({ where: { id } });
    }

    throw new HttpException('Entity cannot be updated', 422);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.usersRepository.delete({ id });
  }
}
