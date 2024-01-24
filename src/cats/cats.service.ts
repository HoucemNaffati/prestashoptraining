import { Injectable } from '@nestjs/common';
import { Cat } from './model/cat';
import { CatStore } from './ports/catStore';

@Injectable()
export class CatsService {
  constructor(private readonly store: CatStore) {}
  async getOne(catId: string) {
    return this.store.byId(catId);
  }
  async getAll() {
    return this.store.all();
  }
  async create(cat: Cat) {
    await this.store.save(cat);
  }

  async changeCharacteristics(id: string, name?: string, age?: number) {
    const cat = await this.store.byId(id);
    await this.store.save({
      ...cat,
      name: name ?? cat.name,
      age: age ?? cat.age,
    });
  }
}
