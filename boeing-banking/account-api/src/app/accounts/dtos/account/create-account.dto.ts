import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsPositive, Max, Min } from "class-validator";
import { Matches } from "class-validator";
export class CreateAccountDto {
  @IsNumber({allowInfinity:false,allowNaN:false},{message:'Account number must be a number'})
  @Type(() => Number)
  @Min(9000000000,{message:'Account number must be in 10 digits'})
  @Max(9999999999,{message:'Account number must be in 10 digits'})
  @IsPositive({message:'Account number must be a positive number'})
  @ApiProperty({example:9000000001,description:'Unique 10 digit account number'})
  accountNo: number;
  @IsNumber({allowInfinity:false,allowNaN:false},{message:'Running total must be a number'})
  @Type(() => Number)
  @Min(100,{message:'Running total must be at least 100'})
  @Max(9999999999,{message:'Running total must be in 10 digits'})
  @IsPositive({message:'Running total must be a positive number'})
  @ApiProperty({example:5000,description:'Initial deposit amount, minimum is 100'})
  runningTotal: number;
  @Type(() => Date)
  @Matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/,{message:'Opening date must be in ISO 8601 format'} )
  @ApiProperty({example:'2023-10-10T10:10:10.000Z',description:'Account opening date in ISO 8601 format'})
  openingDate: Date;
  @Matches(/^(SAVINGS|CURRENT)$/,{message:'Account type must be SAVINGS or CURRENT'})
  @ApiProperty({example:'SAVINGS',description:'Type of account: SAVINGS or CURRENT'})
  accountType: 'SAVINGS' | 'CURRENT'
}
