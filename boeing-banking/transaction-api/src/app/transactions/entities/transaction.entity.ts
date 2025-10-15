import { Column, Entity, JoinColumn, TableInheritance } from 'typeorm';
import { Account } from './account.entity';
import { ManyToOne } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { PrimaryColumn } from 'typeorm';
@Entity("transactions")
//@TableInheritance({ column: { type: "varchar", name: "type" } })
export class Transaction {
  @PrimaryGeneratedColumn({ name: "transaction_id", type: "bigint" })
    //@PrimaryColumn()
  //@Column()
  transactionId: number;
  @Column({ name: "amount", type: "decimal", precision: 10, scale: 2 })
  amount: number;
  @Column({ name: "transaction_date", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  date: Date;
  @Column({ name: "sender_account_no", type: "bigint" })
  senderAccountNo: number;
  @Column({ name: "receiver_account_no", type: "bigint" })
  receiverAccountNo: number;
  @ManyToOne(() => Account, (account) => account.transactions)
  @JoinColumn({ name: "account_no" })
  account: Account;
}
