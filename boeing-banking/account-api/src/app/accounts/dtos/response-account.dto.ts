import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { Expose } from "class-transformer";

export class ResponseAccountDto {

  @ApiProperty()
  @Expose()
  _id: string;

  @ApiProperty()
  @Expose()
  accountNo: number;

  @ApiProperty()
  @Expose()
  runningTotal: number;

  @ApiProperty()
  @Expose()
  accountType: 'SAVINGS' | 'CURRENT'

   // Savings-only field
  @ApiProperty()
  @Expose()
  interestRate?: number;

  // Current-only field
  @ApiProperty()
  @Expose()
  overdraftLimit?: number;


}
