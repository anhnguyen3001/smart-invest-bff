import { Module } from '@nestjs/common';
import { CoreModule } from 'external/core/core.module';
import { IAMModule } from 'external/iam/iam.module';
import { CommentController } from './comment.controller';

@Module({
  imports: [CoreModule, IAMModule],
  controllers: [CommentController],
})
export class CommentModule {}
