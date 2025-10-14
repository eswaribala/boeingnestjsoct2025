import { PartialType } from '@nestjs/mapped-types';
import { CreateAccountDto } from './create-account.dto';

import { Type } from "class-transformer";
import { IsNumber, IsPositive, Max, Min } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
export class UpdateAccountDto extends PartialType(CreateAccountDto) {

   @IsNumber({allowInfinity:false,allowNaN:false},{message:'Running total must be a number'})
   @Type(() => Number)
   @Min(100,{message:'Running total must be at least 100'})
   @Max(9999999999,{message:'Running total must be in 10 digits'})
   @IsPositive({message:'Running total must be a positive number'})
   @ApiProperty({example:5000,description:'Initial deposit amount, minimum is 100'})
   runningTotal?: number;

    @IsNumber()
    @Min(0)
    @ApiProperty({ example: 4.5, description: 'Required when accountType = savings' })

    interestRate?: number;
        // Current-only field

    @ApiProperty({ example: 50000, description: 'Required when accountType = current' })
    @IsNumber()
    @Min(0)
    overdraftLimit?: number;


}
