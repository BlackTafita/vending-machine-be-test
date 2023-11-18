import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productName: string;

  @Column({ nullable: false, default: 0 })
  amountAvailable: number;

  @Column({ nullable: false, default: 10 })
  cost: number;

  @ManyToOne(() => User, (user) => user.products, {})
  @JoinColumn({ name: 'sellerId' })
  user: User;
}
