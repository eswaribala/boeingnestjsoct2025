// addresses/addresses.controller.ts
import {
  Controller, Get, Post, Param, Body, ParseIntPipe, Query,
  UsePipes, ValidationPipe,
} from '@nestjs/common';
import { AddressesService } from './address.service';
import { AddressCreateDto } from './dto/address-create.dto';
import { AddressResponseDto } from './dto/address-response.dto';
import { plainToInstance } from 'class-transformer';

import {
  ApiOkResponse, ApiCreatedResponse, ApiTags, ApiParam, ApiQuery,
} from '@nestjs/swagger';

@ApiTags('Addresses')
@Controller() // mounted by RouterModule at /customers/:customerId/addresses
export class AddressesController {
  constructor(private readonly svc: AddressesService) {}



  @Post()
  @ApiParam({ name: 'customerId', type: Number, required: true })
  @ApiCreatedResponse({ description: 'Created address', type: AddressResponseDto })
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async create(
    @Param('customerId', ParseIntPipe) customerId: number,
    @Body() dto: AddressCreateDto,
  ): Promise<AddressResponseDto> {
    const created = await this.svc.create(customerId, dto);
    return plainToInstance(AddressResponseDto, created, { excludeExtraneousValues: true });
  }

  @Get(':addressId')
  @ApiParam({ name: 'customerId', type: Number, required: true })
  @ApiParam({ name: 'addressId', type: Number, required: true })
  @ApiOkResponse({ description: 'Get one address', type: AddressResponseDto })
  async getOne(
    @Param('customerId', ParseIntPipe) customerId: number,
    @Param('addressId', ParseIntPipe) addressId: number,
  ): Promise<AddressResponseDto> {
    const addr = await this.svc.getOne(customerId, addressId);
    return plainToInstance(AddressResponseDto, addr, { excludeExtraneousValues: true });
  }
}
