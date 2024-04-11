import { Injectable } from '@nestjs/common';
import { CreateCatDto, QueryCatDto, UpdateCatDto } from './cat.dto';
import { Cat } from './cat.interface';
import { v4 } from 'uuid';

@Injectable()
export class CatService {
  private readonly cats: Cat[] = [];

  create(createCatDto: CreateCatDto): Cat {
    const cat = { ...createCatDto, id: v4() };
    this.cats.push(cat);
    return cat;
  }

  findAll(queryCatDto: QueryCatDto): Cat[] {
    /** @todo find cats by `queryCatDto` */
    return this.cats;
  }

  findOne(id: string) {
    return `This action returns a cat: #${id}`;
  }

  update(id: number, updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  remove(id: number) {
    return `This action removes a #${id} cat`;
  }
}
