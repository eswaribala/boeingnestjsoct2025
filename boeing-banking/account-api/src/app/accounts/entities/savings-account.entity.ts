import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Account } from './account.entity';

@Schema()
export class SavingsAccount extends Account {
  @Prop({required:true,default:0.03})
  interestRate: number;
}

export const SavingsAccountSchema = SchemaFactory.createForClass(SavingsAccount);
