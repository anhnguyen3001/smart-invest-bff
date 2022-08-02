import { Module } from '@nestjs/common';
import { CoreService } from './core.service';

@Module({
  exports: [CoreService],
  providers: [CoreService],
})
export class CoreModule {}
