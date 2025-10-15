import { ChildEntity, Column } from 'typeorm';
import { Transaction } from './transaction.entity';
@ChildEntity("external_transactions")
export class ExternalTransaction extends Transaction{
  @Column({ name: "bank_name", type: "varchar", length: 100 })
  branchCode: string;
  @Column({ name: "bank_code", type: "varchar", length: 20 })
  bankCode: string;
  @Column({ name: "swift_code", type: "varchar", length: 20 } )
  swiftCode: string;
  @Column({ name: "country", type: "varchar", length: 50 }  )
  country: string;
}
