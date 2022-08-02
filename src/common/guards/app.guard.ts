import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IAMService } from 'external/iam/iam.service';

@Injectable()
export class AppGuard implements CanActivate {
  constructor(
    private readonly iamService: IAMService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    return true;
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!isPublic) {
      const request = context.switchToHttp().getRequest();

      const authorization = request.headers?.authorization;
      if (authorization) {
        const { data } = await this.iamService.client.get('me', {
          headers: { authorization },
        });
        const { user } = data.data;
        request.user = user;

        if (user) return true;
      }
      return false;
    }

    return true;
  }
}
