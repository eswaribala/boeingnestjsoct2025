import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("accounts")
export class Account {
  @PrimaryGeneratedColumn()
  @Column({ type: "bigint" })
  accountNo: number;

  @Column("decimal", { precision: 10, scale: 2 })
  runningBalance: number;
  @Column("date", { default: () => "CURRENT_DATE" })
  openingDate: Date;
}
