import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from 'auth/auth.module';
import { AppGuard } from 'common/guards/app.guard';
import { CoreModule } from 'external/core/core.module';
import { IAMModule } from 'external/iam/iam.module';
import { UserModule } from 'user/user.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [CoreModule, IAMModule, AuthModule, UserModule, CompanyModule],
  providers: [{ provide: APP_GUARD, useClass: AppGuard }],
})
export class AppModule {}
