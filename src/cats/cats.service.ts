import { Injectable } from '@nestjs/common';

export interface Cat {
  id: string;
  name: string;
  age: number;
}
export interface CatStore {
  byId(id: string): Promise<Cat>;
  all(): Promise<Cat[]>;
  save(cat: Cat): Promise<void>;
}

@Injectable()
export class InMemoryCatStore implements CatStore {
  readonly store = new Map<string, Cat>();
  async byId(id: string): Promise<Cat> {
    return this.store.get(id);
  }
  async all(): Promise<Cat[]> {
    return [...this.store.values()];
  }
  async save(cat: Cat): Promise<void> {
    this.store.set(cat.id, cat);
  }
  clear(){
    this.store.clear();
  }
}

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
