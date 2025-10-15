import { ApiProperty } from "@nestjs/swagger";
import { Account } from '../entities/account.entity';
import { Expose } from "class-transformer";
export class ResponseTransactionDto {

    @ApiProperty()
    @Expose()
    amount: number;
    @ApiProperty()
    @Expose()
    date: Date;
    @ApiProperty()
    @Expose()
    senderAccountNo: number;
    @ApiProperty()
    @Expose()
    receiverAccountNo: number;
    @ApiProperty()
    @Expose()
    account: Account[];
}
