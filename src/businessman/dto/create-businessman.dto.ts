import { IsBoolean, IsDateString, IsEmail, IsNumber, IsString } from "class-validator";

export class CreateBusinessmanDto {

    @IsString()
    nombre :string

    @IsString()
    telefono  :string  

    @IsEmail()
    correo? :string

    @IsDateString()
    fechaRegistro : string

    @IsBoolean()
    estado : boolean

    @IsNumber()
    municipio: number

}
