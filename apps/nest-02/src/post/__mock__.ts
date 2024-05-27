import type { Post, Prisma } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { PostService } from './post.service';

const authorId = uuidv4();
export const mockedPosts: Record<string, Post> = {
  '1': {
    title: 'Test Post 1',
    content: 'Test Content 1',
    id: '1',
    published: false,
    authorId,
  },
  '2': {
    title: 'Test Post 2',
    content: 'Test Content 2',
    id: '2',
    published: false,
    authorId,
  },
  '3': {
    title: 'Test Post 3',
    content: 'Test Content 3',
    id: '3',
    published: false,
    authorId,
  },
};

export const mockDB = {
  post: {
    findMany: jest
      .fn<Post[], []>()
      .mockImplementation(() => Object.values(mockedPosts)),
    findUnique: jest
      .fn<Post | null, Parameters<Prisma.PostDelegate['findUnique']>>()
      .mockImplementation(({ where }) => mockedPosts[where.id!] ?? null),
    create: jest
      .fn<Post, Parameters<Prisma.PostDelegate['create']>>()
      .mockImplementation(({ data }) => {
        const post: Post = {
          id: uuidv4(),
          title: data.title,
          content: data.content ?? null,
          published: data.published ?? null,
          authorId,
        };
        mockedPosts[post.id] = post;
        return post;
      }),
    update: jest
      .fn<Post, Parameters<Prisma.PostDelegate['update']>>()
      .mockImplementation(({ where: { id }, data }) => {
        const post = { ...mockedPosts[id!], ...data } as Post;
        mockedPosts[id!] = post;
        return post;
      }),
    delete: jest
      .fn<Post, Parameters<Prisma.PostDelegate['delete']>>()
      .mockImplementation(({ where: { id } }) => {
        const deletedPost = mockedPosts[id!];
        delete mockedPosts[id!];
        return deletedPost;
      }),
  },
};

export const mockService = {
  create: jest
    .fn<Promise<Post>, Parameters<PostService['create']>>()
    .mockImplementation(async (data) => {
      const post = { ...data, authorId, id: uuidv4() } as Post;
      mockedPosts[post.id] = post;
      return post;
    }),
  findAll: jest
    .fn<Promise<Post[]>, Parameters<PostService['findAll']>>()
    .mockResolvedValue(Object.values(mockedPosts)),
  findOne: jest
    .fn<Promise<Post>, Parameters<PostService['findOne']>>()
    .mockImplementation(async ({ id }) => mockedPosts[id!] ?? null),
  update: jest.fn<Promise<Post>, Parameters<PostService['update']>>(
    async ({ id }, data) => {
      const post = { ...mockedPosts[id!], ...data } as Post;
      mockedPosts[id!] = post;
      return post;
    },
  ),
  remove: jest
    .fn<Promise<Post>, Parameters<PostService['remove']>>()
    .mockImplementation(async ({ id }) => {
      const deletedPost = mockedPosts[id!];
      delete mockedPosts[id!];
      return deletedPost;
    }),
};
