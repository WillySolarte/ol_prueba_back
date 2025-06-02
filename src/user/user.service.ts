import { HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Usuario } from '@prisma/client';
import { IDataResponse } from 'src/common/interfaces/response.interfaces';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) { }



  findAll() {
    return this.prismaService.usuario.findMany();
  }

  async findUserActive(id: number) {
    try {
      const user = await this.prismaService.usuario.findUnique({ where: { id } })
      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }
      type TUserResponse = Omit<Usuario, 'contrasena' | 'createdAt' | 'updatedAt'>;
      const userOut: TUserResponse = {
        id: user.id,
        nombre: user.nombre,
        correo: user.correo,
        rol: user.rol
      }
      const dataResponse: IDataResponse<TUserResponse> = {
        statusCode: 200,
        message: 'Usuario encontrado',
        data: userOut
      }
      return dataResponse

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Error en la conexión');
    }
  }


}
