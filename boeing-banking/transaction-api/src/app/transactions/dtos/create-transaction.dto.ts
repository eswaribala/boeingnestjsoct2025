
import { ApiProperty } from '@nestjs/swagger';
import { IsPositive, Matches, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAccountDto } from './create-account.dto';
export class CreateTransactionDto {
  @IsPositive()
  @ApiProperty({example: 500, description: 'Amount involved in the transaction' })
  amount: number;
  @ApiProperty({example: '2023-01-01', description: 'Date of the transaction' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'transactionDate must be in YYYY-MM-DD format' })
  transactionDate: string;
  @ApiProperty({example: 1, description: 'ID of the sender account' })
  @IsPositive()
  senderAccountNo: number;

  @ApiProperty({example: 2, description: 'ID of the receiver account' })
  @IsPositive()
  receiverAccountNo: number;
 @ApiProperty({example: 1234567890, description: 'Account associated with the transaction' })
  @IsPositive()
  account: number;
  //type: string;

}
