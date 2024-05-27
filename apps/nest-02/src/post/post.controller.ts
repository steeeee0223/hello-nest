import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import type { Post as PostData, Prisma } from '@prisma/client';
import { PostService } from './post.service';
import { QueryPostDto } from './post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async create(
    @Body() createPostDto: Prisma.PostCreateInput,
  ): Promise<PostData> {
    return await this.postService.create(createPostDto);
  }

  @Get()
  async findAll(@Query() queryPostDto: QueryPostDto): Promise<PostData[]> {
    return await this.postService.findAll(queryPostDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PostData | null> {
    return await this.postService.findOne({ id });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: Prisma.PostUpdateInput,
  ): Promise<PostData> {
    return await this.postService.update({ id }, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<PostData> {
    return this.postService.remove({ id });
  }
}
