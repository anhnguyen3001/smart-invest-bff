import { Module } from '@nestjs/common';
import { CoreModule } from 'external/core/core.module';
import { TickerController } from './ticker.controller';

@Module({
  imports: [CoreModule],
  controllers: [TickerController],
})
export class TickerModule {}
