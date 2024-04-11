import { Test, TestingModule } from '@nestjs/testing';
import { CatController } from './cat.controller';
import { CatService } from './cat.service';
import { mockCats, mockCreateCat } from './__mock__';

describe('CatController', () => {
  let controller: CatController;
  let service: CatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatController],
      providers: [CatService],
    }).compile();

    controller = module.get<CatController>(CatController);
    service = module.get<CatService>(CatService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('[findAll] should return 3 default cats', () => {
    jest.spyOn(service, 'findAll').mockReturnValue(mockCats);

    const res = controller.findAll({});
    expect(res).toEqual(mockCats);
  });

  it('[create] should create a new cat successfully', () => {
    let cats = controller.findAll({});
    expect(cats.length).toEqual(0);

    controller.create(mockCreateCat);
    cats = controller.findAll({});
    expect(cats.length).toEqual(1);
  });

  it('[feed] should work correctly', () => {
    const res = controller.feed();
    expect(res).toMatch(/You fed all cats/);
  });
  it('[feed:breed] should work correctly', () => {
    const breed = 'american-shorthair';
    const res = controller.feed(breed);
    const regex = new RegExp(`You fed all ${breed} cats`);
    expect(res).toMatch(regex);
  });

  it('[findByCategory] should work correctly', () => {
    const [category, id] = ['mix', 'fake-id'];
    const res = controller.findByCategory(category, id);
    const regex = new RegExp(
      `This action returns a ${category} cat with ID ${id}`,
    );
    expect(res).toMatch(regex);
  });
});
