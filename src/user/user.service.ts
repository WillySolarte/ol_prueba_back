import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    const { nombre, correo, contrasena, rol} = createUserDto;
    await this.prismaService.usuario.create({
      data: {
        nombre,
        correo,
        contrasena,
        rol,
      },
    });
    return 'This action adds a new user';
  }

  findAll() {
    return this.prismaService.usuario.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
