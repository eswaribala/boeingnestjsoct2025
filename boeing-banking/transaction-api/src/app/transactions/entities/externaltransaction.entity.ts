import { Transaction } from './transaction.entity';

export class ExternalTransaction extends Transaction{
  branchCode: string;
  bankCode: string;
  swiftCode: string;
  country: string;
}
