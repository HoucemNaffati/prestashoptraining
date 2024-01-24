import { Injectable } from '@nestjs/common';
import { CatStore } from '../../ports/catStore';
import { Cat } from '../../model/cat';
import { Exceptions } from '../../model/exceptions';

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
    if (this.store.has(cat.id)) Exceptions.throw(cat.id);
    this.store.set(cat.id, cat);
  }

  clear() {
    this.store.clear();
  }
}
