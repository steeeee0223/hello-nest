import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlModule } from '../url';

@Module({
  imports: [UrlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
