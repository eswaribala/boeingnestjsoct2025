import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches } from "class-validator";
export class UpdateAddressDto{
  @IsNotEmpty()
   @Matches(/^[A-Za-z0-9\s]{1,10}$/, { message: 'Door number must contain only letters, numbers, and spaces' })
   @ApiProperty({ example: 'A1' })
    doorNo: string;
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'Main St' })
    @Matches(/^[A-Za-z0-9\s]{2,100}$/, { message: 'Street must contain only letters, numbers, and spaces' })
    street: string
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'Springfield' })
    @Matches(/^[A-Za-z\s]{2,50}$/, { message: 'City must contain only letters and spaces' })
    city: string;
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'IL' })
    @Matches(/^[A-Za-z\s]{2,50}$/, { message: 'State must contain only letters and spaces' })
    state: string;
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'USA' })
    @Matches(/^[A-Za-z\s]{2,50}$/, { message: 'Country must contain only letters and spaces' })
    country: string;
    @IsNotEmpty()
    @Matches(/^\d{5}(-\d{4})?$/, { message: 'Zip code must be in the format XXXXX or XXXXX-XXXX' })
    @ApiProperty({ example: '62704' })
    zip: string;
}
