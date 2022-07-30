import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from 'auth/auth.module';
import { AppGuard } from 'common/guards/app.guard';
import { IAMModule } from 'external/iam/iam.module';
import { UserModule } from 'user/user.module';

@Module({
  imports: [IAMModule, AuthModule, UserModule],
  providers: [{ provide: APP_GUARD, useClass: AppGuard }],
})
export class AppModule {}
