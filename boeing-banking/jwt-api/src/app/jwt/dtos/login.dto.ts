import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { IsEmail } from 'class-validator';
import { MaxLength } from 'class-validator';
import { MinLength } from 'class-validator';
export  class LoginDto {

  @ApiProperty({ example: 'user@example.com' })
   @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsNotEmpty()
   @MinLength(8)
  @MaxLength(64)
  password: string;
}
