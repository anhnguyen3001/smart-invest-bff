import { Module } from '@nestjs/common';
import { CoreModule } from 'external/core/core.module';
import { FavoriteTickerController } from './favorite-ticker.controller';

@Module({
  imports: [CoreModule],
  controllers: [FavoriteTickerController],
})
export class FavoriteTickerModule {}
