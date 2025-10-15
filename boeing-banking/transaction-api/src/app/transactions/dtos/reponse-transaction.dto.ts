import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { ResponseAccountDto } from "./response-account.dto";
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
    account: ResponseAccountDto[];
}
