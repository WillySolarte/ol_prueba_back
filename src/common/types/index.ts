import { Rol } from "@prisma/client";

export type TUserValidateData = {
    id: number;
    nombre: string;
    rol: Rol;
}

export type TLoginValidate = {
    msg: string;
    error: boolean;
    user: TUserValidateData | null;
}



