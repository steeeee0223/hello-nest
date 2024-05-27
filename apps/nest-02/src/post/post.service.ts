import { Injectable } from '@nestjs/common';
import { PrismaService } from '@steeeee/my-lib/services';
import type { Post, Prisma } from '@prisma/client';
import { QueryPostDto } from './post.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.PostCreateInput): Promise<Post> {
    return this.prisma.post.create({ data });
  }

  findAll(params: QueryPostDto): Promise<Post[]> {
    return this.prisma.post.findMany(params);
  }

  findOne(where: Prisma.PostWhereUniqueInput): Promise<Post | null> {
    return this.prisma.post.findUnique({ where });
  }

  update(where: Prisma.PostWhereUniqueInput, data: Prisma.PostUpdateInput) {
    return this.prisma.post.update({ where, data });
  }

  remove(where: Prisma.PostWhereUniqueInput) {
    return this.prisma.post.delete({ where });
  }
}
