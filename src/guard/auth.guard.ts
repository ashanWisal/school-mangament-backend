// import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
// import { Observable } from 'rxjs';
// // import { Request } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { Request } from 'express';

// @Injectable()
// export class GuardGuard implements CanActivate {
//   constructor(private readonly jwtService: JwtService) { }

//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const request = context.switchToHttp().getRequest()
//     const { url, method } = request
//     const token = this.extractTokenFromHeader(request)

//     if (url === '/auth/signup' && method === 'POST') {
//       return true
//     }
//     if (url === '/auth/login' && method === 'POST') {
//       return true
//     }
//     if (url=== '/teacher' && method === 'GET'){
//       return true
//     }

//     if (!token) {
//       throw new UnauthorizedException("Invalid Token")
//     }
//     try {
//       const payload = this.jwtService.verify(token)
//       request.user = payload
//     } catch (e) {
//       Logger.error(e.message)
//       throw new UnauthorizedException("Invalid Token")
//     }

//     return true
//   }

//   extractTokenFromHeader(request: Request): string | undefined {
//     return request.headers.authorization?.split(' ')[1];
//   }
// }

// auth.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Logger
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from 'src/decorators/public.decorator';
// import { IS_PUBLIC_KEY } from './public.decorator';

@Injectable()
export class GuardGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private reflector: Reflector
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token missing or invalid');
    }

    try {
      const payload = this.jwtService.verify(token);
      request.user = payload;
    } catch (e) {
      Logger.error(e.message);
      throw new UnauthorizedException('Token invalid or expired');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    return request.headers.authorization?.split(' ')[1];
  }
}
