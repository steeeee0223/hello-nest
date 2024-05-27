import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@steeeee/my-lib/services';
import { PostService } from './post.service';
import { mockDB, mockedPosts } from './__mock__';

describe('PostService', () => {
  let service: PostService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostService, { provide: PrismaService, useValue: mockDB }],
    }).compile();

    service = module.get<PostService>(PostService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('[findAll]', () => {
    it('should return an array of posts', async () => {
      const posts = await service.findAll({});
      expect(posts).toEqual(Object.values(mockedPosts));
    });
  });

  describe('[findOne]', () => {
    it('should return the post with id `1`', async () => {
      const post = await service.findOne({ id: '1' });
      expect(post).toEqual(mockedPosts['1']);
    });
  });

  describe('[create]', () => {
    it('should create a new post', async () => {
      const createPostDto = { title: 'new post' };
      const post = await service.create(createPostDto);
      expect(post.title).toEqual(createPostDto.title);
    });
  });

  describe('[update]', () => {
    it('should update the title of post id `1`', async () => {
      const updatePostDto = { title: 'updated title' };
      const post = await service.update({ id: '1' }, updatePostDto);
      expect(post.id).toEqual('1');
      expect(post.title).toEqual(updatePostDto.title);
    });
  });

  describe('[remove]', () => {
    it('should delete the post with id `1`', async () => {
      const post = await service.remove({ id: '1' });
      expect(prisma.post.delete).toHaveBeenCalledTimes(1);
      expect(post.id).toEqual('1');
    });
  });
});
