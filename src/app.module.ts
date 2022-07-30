import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from 'auth/auth.module';
import { AppGuard } from 'common/guards/app.guard';
import { IAMModule } from 'external/iam/iam.module';
import { PermissionModule } from 'permission/permission.module';
import { RoleModule } from 'role/role.module';
import { RouteModule } from 'route/route.module';
import { UserModule } from 'user/user.module';

@Module({
  imports: [
    IAMModule,
    AuthModule,
    UserModule,
    PermissionModule,
    RoleModule,
    RouteModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: AppGuard }],
})
export class AppModule {}
