import { ConflictException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateBusinessmanDto } from './dto/create-businessman.dto';
import { UpdateBusinessmanDto } from './dto/update-businessman.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { IDataResponse } from 'src/common/interfaces/response.interfaces';
import { Comerciante } from '@prisma/client';
import { TUserValidateData } from 'src/common/types';

@Injectable()
export class BusinessmanService {

  constructor(private prismaService: PrismaService) { }

  async create(createBusinessmanDto: CreateBusinessmanDto, user: TUserValidateData) {

    const { nombre, correo, estado, telefono, municipio, fechaRegistro } = createBusinessmanDto;

    try {
      const businessmanExist = await this.prismaService.comerciante.findFirst({ where: { correo } })
      if (businessmanExist) {
        throw new ConflictException('Comerciante ya existe');
      }
      await this.prismaService.comerciante.create({
        data: {
          nombre,
          correo,
          estado,
          telefono,
          municipio: {
            connect: { id: municipio }
          },
          actualizadoPor: {
            connect: { id: user.id }
          },
          fechaRegistro
        }
      })
      const dataResponse: IDataResponse<null> = {
        statusCode: 201,
        message: 'Comerciante creado correctamente',
        data: null
      }
      return dataResponse;

    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new InternalServerErrorException('Error en la conexión');
    }


  }

  async findAll(take: number, page: number) {


    const totalCount = await this.prismaService.comerciante.count();
    const totalPages = Math.ceil(totalCount / take);

    try {
      const comerciantes = await this.prismaService.comerciante.findMany({
        take,
        skip: (page * take) - take,
        orderBy: { id: 'asc' },
        include: {
          establecimientos: true,
        },
      });
      const dataToTable = comerciantes.map((comerciante) => ({
        id: comerciante.id,
        nombre: comerciante.nombre,
        telefono: comerciante.telefono,
        correo: comerciante.correo,
        fechaRegistro: comerciante.fechaRegistro,
        cantidadEstablecimientos: comerciante.establecimientos.length,
        estado: comerciante.estado,
      }));

      type BusinessmanListResponse = {
        comerciantes: typeof dataToTable;
        totalPages: number;
      };

      const dataResponse: IDataResponse<BusinessmanListResponse> = {
        statusCode: 201,
        message: 'Comerciantes retornados correctamente',
        data: {
          comerciantes: dataToTable,
          totalPages
        },
      }

      return dataResponse
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Error en la conexión');
    }

  }

  async findOne(id: number) {

    try {
      const businessman = await this.prismaService.comerciante.findUnique({ where: { id } })
      if (!businessman) {
        throw new NotFoundException('Comerciante no encontrado');
      }
      const dataResponse: IDataResponse<Comerciante> = {
        statusCode: 200,
        message: 'Comerciante encontrado',
        data: businessman
      }
      return dataResponse

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Error en la conexión');
    }

  }

  async update(id: number, updateBusinessmanDto: UpdateBusinessmanDto, user: TUserValidateData) {
    const { nombre, correo, estado, telefono, municipio, fechaRegistro } = updateBusinessmanDto;
    try {
      const businessmanExist = await this.prismaService.comerciante.findUnique({ where: { id } });
      
      if (!businessmanExist) {
        throw new NotFoundException('Comerciante no encontrado');
      }
      await this.prismaService.comerciante.update({
        where: { id },
        data: {
          nombre,
          correo,
          estado,
          telefono,
          municipio: {
            connect: { id: municipio }
          },
          actualizadoPor: {
            connect: { id: user.id }
          },
          fechaRegistro
        }
      });
      const dataResponse: IDataResponse<null> = {
        statusCode: 200,
        message: 'Comerciante actualizado correctamente',
        data: null
      }
      return dataResponse
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Error en la conexión');

    }
  }

  async remove(id: number) {
    try {
      const businessmanExist = await this.prismaService.comerciante.findUnique({ where: { id } });
      if (!businessmanExist) {
        throw new NotFoundException('Comerciante no encontrado');
      }

      await this.prismaService.establecimiento.deleteMany({  where: { comercianteId: id },});

      await this.prismaService.comerciante.delete({ where: { id } });

      const dataResponse: IDataResponse<null> = {
        statusCode: 200,
        message: 'Comerciante eliminado correctamente',
        data: null
      }
      return dataResponse;

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Error en la conexión');

    }
  }

  async changeState(id: number) {

    try {
      const businessmanExist = await this.prismaService.comerciante.findUnique({ where: { id } });
      if (!businessmanExist) {
        throw new NotFoundException('Comerciante no encontrado');
      }

      const newState = !businessmanExist.estado;

      await this.prismaService.comerciante.update({
        where: { id },
        data: {
          estado: newState,
        },
      });

      const response: IDataResponse<boolean> = {
        statusCode: 200,
        message: 'Estado del comerciante actualizado correctamente',
        data: newState,
      };

      return response;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Error en la conexión');
    }
  }
}
