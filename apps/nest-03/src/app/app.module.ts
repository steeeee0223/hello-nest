import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MathModule } from '../math';

@Module({
  imports: [MathModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
