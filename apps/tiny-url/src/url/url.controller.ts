import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UrlService } from './url.service';
import {
  CreateUrlDto,
  ShortUrl,
  createUrlSchema,
  shortUrlSchema,
} from './url.dto';
import { ZodValidationPipe } from '@steeeee/my-lib/pipes';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createUrlSchema))
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUrlDto: CreateUrlDto) {
    return this.urlService.create(createUrlDto);
  }

  @Get()
  findAll() {
    return this.urlService.findAll();
  }

  @Get(':shortUrl')
  findOne(
    @Param('shortUrl', new ZodValidationPipe(shortUrlSchema))
    shortUrl: ShortUrl,
  ) {
    return this.urlService.findOne(shortUrl);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.urlService.update(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.urlService.remove(id);
  }
}
