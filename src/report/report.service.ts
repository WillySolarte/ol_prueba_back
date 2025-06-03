import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Parser } from 'json2csv';
import { Response } from 'express';


@Injectable()
export class ReportService {
  constructor(private prismaService: PrismaService ){}


  async exportCsv(response: Response) {

    const comerciantes = await this.prismaService.comerciante.findMany({
      where: { estado: true },
      include: {
        municipio: true,
        establecimientos: true,
      },
    });

    const data = comerciantes.map((comerciante) => {
      const cantidadEstablecimientos = comerciante.establecimientos.length;
      const totalIngresos = comerciante.establecimientos.reduce(
        (sum, est) => sum + Number(est.ingresos),
        0,
      );
      const totalEmpleados = comerciante.establecimientos.reduce(
        (sum, est) => sum + est.numeroEmpleados,
        0,
      );

      return {
        nombre: comerciante.nombre,
        municipio: comerciante.municipio.nombre,
        telefono: comerciante.telefono,
        correo: comerciante.correo,
        fechaRegistro: comerciante.fechaRegistro ? comerciante.fechaRegistro.toISOString().split('T')[0] : null,
        estado: comerciante.estado ? 'Activo' : 'Inactivo',
        cantidadEstablecimientos,
        totalIngresos,
        totalEmpleados,
      };
    });
    const parser = new Parser({
      delimiter: '|',
      fields: [
        'nombre',
        'municipio',
        'telefono',
        'correo',
        'fechaRegistro',
        'estado',
        'cantidadEstablecimientos',
        'totalIngresos',
        'totalEmpleados',
      ],
    });
    const csv = parser.parse(data);

    response.header('Content-Type', 'text/csv');
    response.attachment('comerciantes.csv');
    response.send(csv);
  }

}
