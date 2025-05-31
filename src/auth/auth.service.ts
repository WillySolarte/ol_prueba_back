import { Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { TLoginValidate, TUserValidateData } from 'src/common/types';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(private prismaService: PrismaService, private readonly jwtService: JwtService){}

  

  async validateUser(loginAuthDto: LoginAuthDto){

    const { correo, contrasena } = loginAuthDto;

    try {
      const userExist = await this.prismaService.usuario.findUnique({where: { correo }});

      if (!userExist) {
        const result: TLoginValidate = {
          msg: 'Usuario no registrado',
          error: true,
          user: null
        }
        return result
      }

      const passwordValid = await bcrypt.compare(contrasena, userExist.contrasena)
      if (!passwordValid) {
        const result: TLoginValidate = {
          msg: 'Contraseña incorrecta',
          error: true,
          user: null
        }
        return result
      }
      const result: TLoginValidate = {
        msg: 'Usuario validado correctamente',
        error: false,
        user: { id: userExist.id, nombre: userExist.nombre, rol: userExist.rol }
      }
      return result;

    } catch (error) {
      const result: TLoginValidate = {
        msg: 'Error en la consulta: ' + error,
        error: true,
        user: null
      }
      return result
    }

  }

  login(user: TUserValidateData) {

    const payload = user;
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  

  
}
