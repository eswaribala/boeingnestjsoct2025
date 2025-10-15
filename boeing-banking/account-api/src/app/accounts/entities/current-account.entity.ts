import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Account } from './account.entity';
import { Schema } from '@nestjs/mongoose';
@Schema()
export class CurrentAccount extends Account {
  @Prop({required:true})
  overdraftLimit: number;
}

export const CurrentAccountSchema = SchemaFactory.createForClass(CurrentAccount);
