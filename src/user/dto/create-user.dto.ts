import { IsString, IsEmail, IsEnum } from "class-validator";
import { Rol } from "@prisma/client";

export class CreateUserDto {

    @IsString()
    nombre: string;

    @IsEmail()
    correo: string;

    @IsString()
    contrasena: string;

    @IsEnum(Rol)
    rol: Rol;
}
