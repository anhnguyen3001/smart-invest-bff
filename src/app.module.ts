import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from 'auth/auth.module';
import { AppGuard } from 'common/guards/app.guard';
import { CoreModule } from 'external/core/core.module';
import { IAMModule } from 'external/iam/iam.module';
import { FinancialStatementModule } from 'financial-statement/financial-statement.module';
import { NewsModule } from 'news/news.module';
import { UserModule } from 'user/user.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [
    CoreModule,
    IAMModule,
    AuthModule,
    UserModule,
    CompanyModule,
    FinancialStatementModule,
    NewsModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: AppGuard }],
})
export class AppModule {}
