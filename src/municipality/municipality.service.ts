import { HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IDataResponse } from '../common/interfaces/response.interfaces';
import { Municipio } from '@prisma/client';


@Injectable()
export class MunicipalityService {

  constructor(private prismaService: PrismaService) { }


  async findAll() {
    try {
      const municipalities = await this.prismaService.municipio.findMany();
      if (!municipalities.length) {
        throw new NotFoundException('No hay municipios registrados');
      }

      const DataResponse: IDataResponse<Municipio[]> = {
        statusCode: 200,
        message: 'Municipios obtenidos correctamente',
        data: municipalities
      }
      return DataResponse;

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Error en la conexión');
    }


  }

  findOne(id: number) {
    return `This action returns a #${id} municipality`;
  }


}
