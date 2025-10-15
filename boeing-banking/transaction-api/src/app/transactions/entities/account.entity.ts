import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import { Transaction } from "./transaction.entity";

@Entity("accounts")
export class Account {
  @PrimaryGeneratedColumn({ name: "account_no", type: "bigint" })
  //@PrimaryColumn()
  //@Column({ name: "account_no", type: "bigint" })
  accountNo: number;
  @Column({ name: "running_balance", type: "decimal", precision: 10, scale: 2 })
  runningBalance: number;
  @Column({ name: "opening_date", type: "date", default: () => "CURRENT_DATE" })
  openingDate: Date;

  @OneToMany(() => Transaction, (transaction) => transaction.account,{
    cascade: ["insert", "update","remove"],
    eager: false,
  })
  transactions: Transaction[];
}
