import { IsEmail, IsString } from "class-validator";

export class LoginAuthDto {

    @IsEmail()
    correo: string;

    @IsString()
    contrasena: string;
    
    
}