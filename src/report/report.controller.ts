import { Controller, Get, Res, UseGuards} from '@nestjs/common';
import { ReportService } from './report.service';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AdminModeratorGuard } from 'src/auth/guards/admin.guard';



@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  

  
  @UseGuards(AuthGuard('jwt'), AdminModeratorGuard)
  @Get('export')
  exportCsv(@Res() res: Response) {
  return this.reportService.exportCsv(res);
}

  
}
