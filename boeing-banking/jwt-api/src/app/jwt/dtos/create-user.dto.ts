import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'user@example.com' })
  email: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({ example: 'password123' })
  passwordHash: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'John Doe' })
  name: string;
  @IsOptional()
  @IsArray()
  @ApiProperty({ example: ['USER', 'ADMIN'] })
  roles?: string[];
}
