import { Transaction } from './transaction.entity';
import { ChildEntity, Column } from 'typeorm';
@ChildEntity("direct_debit")
export class DirectDebit extends Transaction {
  @Column({ name: "payment_date", type: "date"})
  paymentDate: Date;
}
