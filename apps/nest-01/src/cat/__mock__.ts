import { CreateCatDto } from './cat.dto';
import { Cat } from './cat.interface';

export const mockCreateCat: CreateCatDto = {
  name: 'Tom',
  age: 12,
  breed: 'mixed',
  sex: 'm',
};

export const mockCats: Cat[] = [
  {
    id: 'ee48a52c-b1dc-41d7-98c3-0f6e65ce405d',
    ...mockCreateCat,
  },
  {
    id: '63a08640-a633-4586-a92e-aca43dec6e92',
    name: 'John',
    age: 2,
    breed: 'american-shorthair',
    sex: 'm',
  },
  {
    id: 'ae372487-c97e-461d-8d05-761ca63e8874',
    name: 'Alice',
    age: 5,
    breed: 'mixed',
    sex: 'f',
  },
];

export const mockCatService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  upadte: jest.fn(),
  remove: jest.fn(),
};
