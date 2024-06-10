import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { EncodeService, ZookeeperService } from '@steeeee/my-lib/services';

@Module({
  imports: [],
  controllers: [UrlController],
  providers: [UrlService, ZookeeperService, EncodeService],
})
export class UrlModule {}
