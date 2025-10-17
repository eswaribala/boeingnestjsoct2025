import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
    if (!required || required.length === 0) return true;

    const req =
      ctx.getType() === 'http'
        ? ctx.switchToHttp().getRequest()
        : (ctx as any).getArgByIndex?.(2)?.req; // GraphQL compatibility if needed

    const userRoles: string[] = req?.user?.roles ?? [];
    return required.some((r) => userRoles.includes(r));
  }
}
