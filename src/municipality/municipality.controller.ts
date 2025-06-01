import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { MunicipalityService } from './municipality.service';
import { AuthGuard } from '@nestjs/passport';


@Controller('municipality')
export class MunicipalityController {
  constructor(private readonly municipalityService: MunicipalityService) {}

 
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.municipalityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.municipalityService.findOne(+id);
  }

  
}
