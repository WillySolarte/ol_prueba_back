import { Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { TUserValidateData } from "src/common/types";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET as string, 
    });
  }

  validate(payload: TUserValidateData) {
    return { id: payload.id, nombre: payload.nombre, rol: payload.rol };
  }
}