import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
import { UserRole } from '../../shared/enums/user-role.enum';

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

  @Column({ enum: [UserRole.BUYER, UserRole.SELLER], nullable: false })
  role: UserRole;

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];
}
