import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCatDto, QueryCatDto, UpdateCatDto } from './cat.dto';
import { Cat } from './cat.interface';
import { v4 } from 'uuid';

@Injectable()
export class CatService {
  private cats: Cat[] = [];

  create(createCatDto: CreateCatDto): Cat {
    const cat = { ...createCatDto, id: v4() };
    this.cats.push(cat);
    return cat;
  }

  findAll(query: QueryCatDto): Cat[] {
    const predicate = ({ breed, sex }: Cat): boolean => {
      // Breed doesn't match, filter out this cat
      if (query.breed && breed !== query.breed) return false;
      // Sex doesn't match, filter out this cat
      if (query.sex && sex !== query.sex) return false;
      // Cat matches all query criteria
      return true;
    };
    return this.cats.filter(predicate);
  }

  findOne($id: string): Cat {
    const cat = this.cats.find(({ id }) => id === $id);
    if (!cat) throw new NotFoundException('Not found');
    return cat;
  }

  update($id: string, updateCatDto: UpdateCatDto) {
    const cat = this.cats.find(({ id }) => id === $id);
    if (!cat) throw new NotFoundException('Not found');

    const updatedCat = { ...cat, ...updateCatDto };
    this.cats = this.cats.map((cat) => (cat.id === $id ? updatedCat : cat));
    return updatedCat;
  }

  remove($id: string): Cat {
    const cat = this.cats.find(({ id }) => id === $id);
    if (!cat) throw new NotFoundException('Not found');

    this.cats = this.cats.filter(({ id }) => id !== $id);
    return cat;
  }
}
