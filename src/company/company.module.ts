import { Module } from '@nestjs/common';
import { CoreModule } from 'external/core/core.module';
import { CompanyController } from './company.controller';

@Module({
  imports: [CoreModule],
  controllers: [CompanyController],
})
export class CompanyModule {}
