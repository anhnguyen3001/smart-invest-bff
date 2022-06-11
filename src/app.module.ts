import { Module } from '@nestjs/common';
import { AuthModule } from 'auth/auth.module';
import { IAMModule } from 'external/iam/iam.module';

@Module({
  imports: [IAMModule, AuthModule],
})
export class AppModule {}
