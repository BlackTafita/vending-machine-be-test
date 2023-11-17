import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productName: string;

  @Column({ nullable: false, default: 0 })
  amountAvailable: number;

  @ManyToOne(() => User, (user) => user.products, {})
  user: User;
}
