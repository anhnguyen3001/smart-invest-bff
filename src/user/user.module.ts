import { Module } from '@nestjs/common';
import { IAMModule } from 'external/iam/iam.module';
import { UserProfileController } from './user-profile.controller';

@Module({
  imports: [IAMModule],
  controllers: [UserProfileController],
})
export class UserModule {}
