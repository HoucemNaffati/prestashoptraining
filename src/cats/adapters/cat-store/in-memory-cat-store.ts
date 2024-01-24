import { Inject, Injectable } from '@nestjs/common';
import { CatStore } from '../../core/ports/catStore';
import { Cat } from '../../core/model/cat';
import {
  CatAlreadyExistException,
  CatNotFoundException,
} from '../../core/model/exceptions';

@Injectable()
export class InMemoryCatStore implements CatStore {
  constructor(@Inject('MY_PARAM') param: number) {}
  readonly store = new Map<string, Cat>();

  async byId(id: string): Promise<Cat> {
    const cat = this.store.get(id);
    if (cat === undefined) CatNotFoundException.throw(id);
    return cat;
  }

  async all(): Promise<Cat[]> {
    return [...this.store.values()];
  }

  async save(cat: Cat): Promise<void> {
    if (this.store.has(cat.id)) CatAlreadyExistException.throw(cat.id);
    this.store.set(cat.id, cat);
  }

  clear() {
    this.store.clear();
  }
}
