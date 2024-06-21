import { Module } from '@nestjs/common';
import { AuthModule } from './module/index';

@Module({
  imports: [AuthModule],
})
export class AppModule {}
