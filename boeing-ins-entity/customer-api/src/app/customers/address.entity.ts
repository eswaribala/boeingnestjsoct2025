import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Index } from 'typeorm';
import { Customer } from './customer.entity';

@Entity('addresses')
@Index(['customer', 'id'])
export class Address {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 20 })
  doorNumber!: string;

  @Column({ length: 100 })
  street!: string;

  @Column({ length: 60 })
  city!: string;

  @Column({ length: 60 })
  state!: string;

  @Column({ length: 12 })
  zip!: string;

@ManyToOne(() => Customer, (customer) => customer.addresses, { onDelete: 'CASCADE' })
  customer!: Customer;
}
