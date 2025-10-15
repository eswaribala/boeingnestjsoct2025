import { ApiProperty } from "@nestjs/swagger";
import { ArrayMinSize, IsArray, IsPositive, Matches, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateTransactionDto } from "./create-transaction.dto";

export class CreateAccountDto {
  @IsPositive()
  @ApiProperty({example: 1234567890, description: 'Unique account number' })
  accountNo: number;
  @IsPositive()
  @ApiProperty({example: 1000, description: 'Current balance of the account' })
  runningBalance: number;
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'openingDate must be in YYYY-MM-DD format' })
  @ApiProperty({example: '2023-10-01', description: 'Date when the account was opened' })
  openingDate: Date;

  @ApiProperty({example: [], description: 'List of transactions associated with the account' })
  @IsArray()
  @ArrayMinSize(0)
  @ValidateNested({ each: true })
  @Type(() => CreateTransactionDto)
  transactions?: CreateTransactionDto[];

}
