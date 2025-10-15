import { Account } from './account.entity';
export class Transaction {
  transactionId: number;
  amount: number;
  date: Date;
  senderAccountNo: number;
  receiverAccountNo: number;
  account: Account;
}
