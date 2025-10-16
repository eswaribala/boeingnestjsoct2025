import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { ResponseTransactionDto } from "./reponse-transaction.dto";
export class ResponseAccountDto {

  @Expose()
  @ApiProperty()
  accountNo: number;
  @Expose()
  @ApiProperty()
  runningBalance: number;
  @Expose()
  @ApiProperty()
  openingDate: string;
  @Expose()
   @ApiProperty()
  transactions?: ResponseTransactionDto[];

}
