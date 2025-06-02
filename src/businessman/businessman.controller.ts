import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Req, Query } from '@nestjs/common';
import { BusinessmanService } from './businessman.service';
import { CreateBusinessmanDto } from './dto/create-businessman.dto';
import { UpdateBusinessmanDto } from './dto/update-businessman.dto';
import { AuthGuard } from '@nestjs/passport';
import { TUserValidateData } from 'src/common/types';
import { AdminModeratorGuard } from 'src/auth/guards/admin.guard';
import { PaginationBusinessmanDto } from './dto/pagination-businessman.dto';

@Controller('businessman')
export class BusinessmanController {
  constructor(private readonly businessmanService: BusinessmanService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createBusinessmanDto: CreateBusinessmanDto, @Req() req: Request & { user: TUserValidateData }) {
    return this.businessmanService.create(createBusinessmanDto, req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('all')
  findAll(@Query() paginationBusinessmanDto: PaginationBusinessmanDto) {
    return this.businessmanService.findAll(paginationBusinessmanDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.businessmanService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateBusinessmanDto: UpdateBusinessmanDto, @Req() req: Request & { user: TUserValidateData }) {
    
    return this.businessmanService.update(id, updateBusinessmanDto, req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('change-state/:id')
  changeState(@Param('id', ParseIntPipe) id: number) {
    return this.businessmanService.changeState(id);
  }

  @UseGuards(AuthGuard('jwt'), AdminModeratorGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.businessmanService.remove(id);
  }
}
