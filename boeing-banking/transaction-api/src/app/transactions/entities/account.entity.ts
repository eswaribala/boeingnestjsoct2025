import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Transaction } from "typeorm";

@Entity("accounts")
export class Account {
  @PrimaryGeneratedColumn()
  @Column({ name: "account_no", type: "bigint" })
  accountNo: number;
  @Column({ name: "running_balance", type: "decimal", precision: 10, scale: 2 })
  runningBalance: number;
  @Column({ name: "opening_date", type: "date", default: () => "CURRENT_DATE" })
  openingDate: Date;

  @OneToMany(() => Transaction, (transaction) => transaction.account)
  transactions: Transaction[];
}
