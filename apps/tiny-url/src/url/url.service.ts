import { Injectable } from '@nestjs/common';
import { EncodeService, ZookeeperService } from '@steeeee/my-lib/services';
import { CreateUrlDto, ShortUrl } from './url.dto';

@Injectable()
export class UrlService {
  constructor(
    private zookeeperService: ZookeeperService,
    private encodeService: EncodeService,
  ) {}

  private async checkBasePath() {
    return await this.zookeeperService.has(`/key`, true);
  }

  async create({ url }: CreateUrlDto) {
    const res = await this.checkBasePath();
    if (!res) return `error occurred`;
    const id = await this.zookeeperService.generateKey(`/key/url-`, url);

    const base62 = this.encodeService.toBase62(id.slice(9), 7);
    return `This action creates a short url for: ${url} -> ${base62}`;
  }

  findAll() {
    return `This action returns all url`;
  }

  findOne(shortUrl: ShortUrl) {
    return `This action returns the original url from: ${shortUrl}`;
  }

  update(id: string) {
    return `This action updates a #${id} url`;
  }

  remove(id: string) {
    return `This action removes a #${id} url`;
  }
}
