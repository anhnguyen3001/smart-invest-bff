import { Module } from '@nestjs/common';
import { CoreModule } from 'external/core/core.module';
import { FinancialStatementController } from './financial-statement.controller';

@Module({
  imports: [CoreModule],
  controllers: [FinancialStatementController],
})
export class FinancialStatementModule {}
