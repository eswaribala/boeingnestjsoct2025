import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { Prop } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
export type AccountDocument = HydratedDocument<Account>;

export enum AccountType {
  SAVINGS = 'SAVINGS',
  CURRENT = 'CURRENT'
}
@Schema({ timestamps: false, versionKey: false,discriminatorKey: 'accountType',collection: 'accounts', strict: true,          // keep strict to prunes unknowns (the child adds its own paths)
  strictQuery: true })
export class Account {
  @Prop({unique:true,required:true})
  accountNo: number;
  @Prop({required:true})
  runningTotal: number;
  @Prop({required:true})
  openingDate: Date;


}

export const AccountSchema = SchemaFactory.createForClass(Account);

AccountSchema.index({ accountNo: 1 }, { unique: true });
AccountSchema.index({ accountType: 1 });
AccountSchema.index({ openingDate: 1 });
AccountSchema.index({ runningTotal: 1 });



