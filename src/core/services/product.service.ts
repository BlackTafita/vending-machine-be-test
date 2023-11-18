import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import {
  DeepPartial,
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async find(search: FindManyOptions<Product>): Promise<Product[]> {
    return this.productRepository.find(search);
  }

  async findOne(search: FindOneOptions<Product>): Promise<Product> {
    return this.productRepository.findOne(search);
  }

  async create(productData: DeepPartial<Product>): Promise<Product> {
    const product = this.productRepository.create({ ...productData });
    return this.productRepository.save(product);
  }

  async update(
    id: number,
    productData: DeepPartial<Product>,
  ): Promise<Product> {
    const update = await this.productRepository.update({ id }, productData);

    if (update?.affected) {
      return this.productRepository.findOne({ where: { id } });
    }

    throw new HttpException('Entity cannot be updated', 422);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.productRepository.delete({ id });
  }
}
