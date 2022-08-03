import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from 'auth/auth.module';
import { CommentModule } from 'comment/comment.module';
import { AppGuard } from 'common/guards/app.guard';
import { CoreModule } from 'external/core/core.module';
import { IAMModule } from 'external/iam/iam.module';
import { FavoriteListModule } from 'favoriteList/favorite-list.module';
import { FavoriteTickerModule } from 'favoriteTicker/favorite-ticker.module';
import { FinancialIndexModule } from 'financial-index/financial-index.module';
import { FinancialStatementModule } from 'financial-statement/financial-statement.module';
import { NewsModule } from 'news/news.module';
import { TickerModule } from 'ticker/ticker.module';
import { UserModule } from 'user/user.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [
    CoreModule,
    IAMModule,
    AuthModule,
    UserModule,
    CompanyModule,
    TickerModule,
    NewsModule,
    CommentModule,
    FavoriteListModule,
    FavoriteTickerModule,
    FinancialStatementModule,
    FinancialIndexModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: AppGuard }],
})
export class AppModule {}
