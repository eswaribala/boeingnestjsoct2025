import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { Transaction } from "../entities/transaction.entity";
export class ResponseAccountDto {

  @Expose()
  @ApiProperty()
  accountNo: number;
  @Expose()
 @ApiProperty()
  runningBalance: number;
  @Expose()
 @ApiProperty()
  openingDate: Date;
  @Expose()
   @ApiProperty()

  transactions?: Transaction[];

}
