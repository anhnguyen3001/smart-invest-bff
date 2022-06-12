import { Module } from '@nestjs/common';
import { AuthModule } from 'auth/auth.module';
import { IAMModule } from 'external/iam/iam.module';
import { PermissionModule } from 'permission/permission.module';
import { RoleModule } from 'role/role.module';
import { RouteModule } from 'route/route.module';

@Module({
  imports: [IAMModule, AuthModule, PermissionModule, RoleModule, RouteModule],
})
export class AppModule {}
