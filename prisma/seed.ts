import { Comerciante, PrismaClient, Rol } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const hashPassAdmin = bcrypt.hashSync('Admin12345', 10);
const hashPassAux = bcrypt.hashSync('Aux12345', 10);

async function main() {
  // 1. Crear municipios
  const municipioNombres = ['Cali', 'Bogotá', 'Medellín', 'Barranquilla', 'Cartagena'];
  const municipios = await Promise.all(
    municipioNombres.map(nombre =>
      prisma.municipio.create({ data: { nombre } })
    )
  );

  // 2. Crear usuarios
  const usuarioAdmin = await prisma.usuario.create({
    data: {
      nombre: 'Admin User',
      correo: 'admin@example.com',
      contrasena: hashPassAdmin,
      rol: Rol.ADMIN,
    },
  });

  const usuarioAuxiliar = await prisma.usuario.create({
    data: {
      nombre: 'Auxiliar User',
      correo: 'auxiliar@example.com',
      contrasena: hashPassAux,
      rol: Rol.AUXILIAR,
    },
  });

  const usuarios = [usuarioAdmin, usuarioAuxiliar];

  // 3. Crear comerciantes
  const comerciantes: Comerciante [] = [];

  for (let i = 0; i < 5; i++) {
    const comerciante = await prisma.comerciante.create({
      data: {
        nombre: faker.person.fullName(),
        municipioId: faker.helpers.arrayElement(municipios).id,
        telefono: faker.phone.number(),
        correo: faker.internet.email(),
        actualizadoPorId: faker.helpers.arrayElement(usuarios).id,
      },
    });
    comerciantes.push(comerciante);
  }

  // 4. Crear establecimientos (10 registros)
  for (let i = 0; i < 10; i++) {
    const comerciante = faker.helpers.arrayElement(comerciantes);
    await prisma.establecimiento.create({
      data: {
        nombre: faker.company.name(),
        ingresos: faker.number.float({ min: 1000, max: 10000, fractionDigits: 2 }),
        numeroEmpleados: faker.number.int({ min: 1, max: 20 }),
        comercianteId: comerciante.id,
        actualizadoPorId: faker.helpers.arrayElement(usuarios).id,
      },
    });
  }

  console.log('Datos semilla generados correctamente.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect();
  });
