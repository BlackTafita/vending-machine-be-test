import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
enum UserRoles {
  BUYER,
  SELLER,
}
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false, default: 0 })
  deposit: number;

  @Column({ enum: [UserRoles.BUYER, UserRoles.SELLER], nullable: false })
  role: UserRoles;

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];
}
