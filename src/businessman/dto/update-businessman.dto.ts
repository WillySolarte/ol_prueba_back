import { PartialType } from '@nestjs/mapped-types';
import { CreateBusinessmanDto } from './create-businessman.dto';

export class UpdateBusinessmanDto extends PartialType(CreateBusinessmanDto) {}
