import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { TUserValidateData } from 'src/common/types';
import { AuthGuard } from '@nestjs/passport';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('user/active')
  findOne( @Req() req: Request & { user: TUserValidateData }) {
    return this.userService.findUserActive(req.user.id);
  }

  
}
