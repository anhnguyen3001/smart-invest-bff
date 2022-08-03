import { Module } from '@nestjs/common';
import { CoreModule } from 'external/core/core.module';
import { FinancialIndexController } from './financial-index.controller';

@Module({
  imports: [CoreModule],
  controllers: [FinancialIndexController],
})
export class FinancialIndexModule {}
