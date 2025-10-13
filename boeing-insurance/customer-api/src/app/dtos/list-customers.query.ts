import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt,  Min } from 'class-validator';

export class ListCustomersQuery {
  @ApiPropertyOptional({ default: 1 })
  @Type(() => Number) @IsInt() @Min(1)
  page?: number;

  @ApiPropertyOptional({ default: 10 })
  @Type(() => Number) @IsInt() @Min(1)
  limit?: number;
  @ApiPropertyOptional({ example: 'John' })
  search?: string;
  @ApiPropertyOptional({ example: 'firstName' })
  sortBy?: string;
  @ApiPropertyOptional({ example: 'ASC', enum: ['ASC', 'DESC'] })
  sortOrder?: 'ASC' | 'DESC';

  constructor(partial: Partial<ListCustomersQuery>) {
    Object.assign(this, partial);
  }

  validate() {
    if (this.page !== undefined && (isNaN(this.page) || this.page < 1)) {
      throw new Error('Page must be a positive number');
    }
    if (this.limit !== undefined && (isNaN(this.limit) || this.limit < 1)) {
      throw new Error('Limit must be a positive number');
    }
    if (this.sortOrder && !['ASC', 'DESC'].includes(this.sortOrder)) {
      throw new Error('Sort order must be either ASC or DESC');
    }
    if (this.sortBy && typeof this.sortBy !== 'string') {
      throw new Error('Sort by must be a string');
    }
    if (this.search && typeof this.search !== 'string') {
      throw new Error('Search must be a string');
    }
    return true;
  }


}
