
import { ApiPropertyOptional } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { AddressCreateDto } from './address-create.dto';
import { MinLength } from 'class-validator/types/decorator/string/MinLength';
import { IsString } from 'class-validator/types/decorator/typechecker/IsString';
import { IsOptional } from 'class-validator/types/decorator/common/IsOptional';
export class UpdateCustomerDto {
  @ApiPropertyOptional({ example: 'Ada' })
  @IsOptional() @IsString() @MinLength(2)
  firstName?: string;
   @ApiPropertyOptional({ example: 'Ada' })
  @IsOptional() @IsString() @MinLength(2)
  lastName?: string;
   @ApiPropertyOptional({ example: 'Ada' })
  @IsOptional() @IsString() @MinLength(2)
  email?: string;
   @ApiPropertyOptional({ example: 'Ada' })
  @IsOptional() @IsString() @MinLength(2)
  phone?: string;
   @ApiPropertyOptional({ example: 'Ada' })
  @IsOptional() @IsString() @MinLength(2)
  addressCreateDto?: AddressCreateDto;
}
