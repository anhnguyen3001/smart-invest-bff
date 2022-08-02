import { Module } from '@nestjs/common';
import { CoreModule } from 'external/core/core.module';
import { NewsController } from './news.controller';

@Module({
  imports: [CoreModule],
  controllers: [NewsController],
})
export class NewsModule {}
