import { Module } from '@nestjs/common';
import { IAMModule } from 'external/iam/iam.module';

@Module({
  imports: [IAMModule],
})
export class AppModule {}
