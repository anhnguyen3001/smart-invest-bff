import { Module } from '@nestjs/common';
import { CoreModule } from 'external/core/core.module';
import { FavoriteListController } from './favorite-list.controller';

@Module({
  imports: [CoreModule],
  controllers: [FavoriteListController],
})
export class FavoriteListModule {}
