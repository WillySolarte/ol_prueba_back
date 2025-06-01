// src/businessman/dto/pagination.dto.ts
import { IsOptional, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationBusinessmanDto {
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit?: number = 5;
}
