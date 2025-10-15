import { ApiProperty } from "@nestjs/swagger";
import { IsPositive } from "class-validator";
export class UpdateAccountDto {
  @ApiProperty({example: 1000, description: 'Updated balance of the account' })
  @IsPositive()
  runningBalance: number;
}
