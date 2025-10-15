import { Account } from '../entities/account.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsPositive, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
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
  @ApiProperty({type: [Account]})
  @ValidateNested({each: true})
  @Type(() => Account)
  account: Account[];
  //type: string;

}
