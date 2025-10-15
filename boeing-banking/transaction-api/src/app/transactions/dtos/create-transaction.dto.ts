
import { ApiProperty } from '@nestjs/swagger';
import { IsPositive, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAccountDto } from './create-account.dto';
export class CreateTransactionDto {
  @IsPositive()
  @ApiProperty({example: 500, description: 'Amount involved in the transaction' })
  amount: number;
  @ApiProperty({example: '2023-01-01', description: 'Date of the transaction' })
  date: Date;
  @ApiProperty({example: 1, description: 'ID of the sender account' })
  @IsPositive()
  senderAccountNo: number;

  @ApiProperty({example: 2, description: 'ID of the receiver account' })
  @IsPositive()
  receiverAccountNo: number;
  @ApiProperty({type: [CreateAccountDto], example: [], description: 'Account associated with the transaction' })
  @ValidateNested({each: true})
  @Type(() => CreateAccountDto)
  account: CreateAccountDto[];
  //type: string;

}
