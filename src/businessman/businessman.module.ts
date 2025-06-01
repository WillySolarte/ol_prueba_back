import { Module } from '@nestjs/common';
import { BusinessmanService } from './businessman.service';
import { BusinessmanController } from './businessman.controller';

@Module({
  controllers: [BusinessmanController],
  providers: [BusinessmanService],
})
export class BusinessmanModule {}
