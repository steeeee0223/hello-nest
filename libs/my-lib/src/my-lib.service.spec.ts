import { Test, TestingModule } from '@nestjs/testing';
import { MyLibService } from './my-lib.service';

describe('MyLibService', () => {
  let service: MyLibService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MyLibService],
    }).compile();

    service = module.get<MyLibService>(MyLibService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
