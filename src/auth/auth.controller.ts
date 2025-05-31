import { Controller, Post, Body,  HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { TLoginValidate, TUserValidateData } from 'src/common/types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('login')
  async login(@Body() loginAuthDto: LoginAuthDto) {
    const result: TLoginValidate = await this.authService.validateUser(loginAuthDto);
    if (result.error) {
      throw new HttpException(result.msg, HttpStatus.BAD_REQUEST);
    }
    return this.authService.login(result.user as TUserValidateData);
  }

  

 
}
