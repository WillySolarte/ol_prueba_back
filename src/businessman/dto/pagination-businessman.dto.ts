// src/businessman/dto/pagination.dto.ts
import { IsNumber, IsPositive } from 'class-validator';

export class PaginationBusinessmanDto {
  
  @IsPositive()
  @IsNumber()
  take: number;

  @IsPositive()
  @IsNumber()
  page: number


}
