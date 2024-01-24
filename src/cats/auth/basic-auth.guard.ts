import { ExecutionContext, Injectable, SetMetadata } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
@Injectable()
export class BasicAuthGuard extends AuthGuard('basic') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    return this.isPublic(context) ? true : super.canActivate(context);
  }

  private isPublic(context: ExecutionContext) {
    return this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
  }
}
