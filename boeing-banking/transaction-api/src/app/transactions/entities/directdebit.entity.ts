import { Transaction } from './transaction.entity';

export class DirectDebit extends Transaction {
  paymentDate: Date;
}
