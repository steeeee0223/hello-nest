import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { mockService, mockedPosts } from './__mock__';

describe('PostController', () => {
  let controller: PostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [{ provide: PostService, useValue: mockService }],
    }).compile();

    controller = module.get<PostController>(PostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('[findAll]', () => {
    it('should return an array of posts', async () => {
      const posts = await controller.findAll({});
      expect(posts).toEqual(Object.values(mockedPosts));
    });
  });

  describe('[findOne]', () => {
    it('should return the post with id `1`', async () => {
      const post = await controller.findOne('1');
      expect(post).toEqual(mockedPosts['1']);
    });
  });

  describe('[create]', () => {
    it('should create a new post', async () => {
      const createPostDto = { title: 'new post' };
      const post = await controller.create(createPostDto);
      expect(post.title).toEqual(createPostDto.title);
    });
  });

  describe('[update]', () => {
    it('should update the title of post id `1`', async () => {
      const updatePostDto = { title: 'updated title' };
      const post = await controller.update('1', updatePostDto);
      expect(post.id).toEqual('1');
      expect(post.title).toEqual(updatePostDto.title);
    });
  });

  describe('[remove]', () => {
    it('should delete the post with id `1`', async () => {
      const post = await controller.remove('1');
      expect(post.id).toEqual('1');
    });
  });
});
