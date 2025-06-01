import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Request } from 'express';
import { TUserValidateData } from 'src/common/types';

@Injectable()
export class AdminModeratorGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request & { user?: TUserValidateData }>();
    const user = request.user;
    
    const allowedRoles = ['ADMIN'];
    if (!allowedRoles.includes(user?.rol ?? '')) {
      throw new ForbiddenException('No tiene los permisos necesarios');
    }

    return true; 
  }
}