import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { Prop } from "@nestjs/mongoose";
@Schema({ timestamps: false, versionKey: false,discriminatorKey: 'accountType',collection: 'accounts' })
export class Account {
  @Prop({unique:true,required:true})
  accountNo: number;
  @Prop({required:true})
  runningTotal: number;
  @Prop({required:true})
  openingDate: Date;
  @Prop({required:true,enum:['SAVINGS','CURRENT']})
  accountType: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);

AccountSchema.index({ accountNo: 1 }, { unique: true });
AccountSchema.index({ accountType: 1 });
AccountSchema.index({ openingDate: 1 });
AccountSchema.index({ runningTotal: 1 });
AccountSchema.index({ accountType: 1, runningTotal: -1 });


