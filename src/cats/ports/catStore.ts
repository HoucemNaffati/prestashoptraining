import { Cat } from '../model/cat';

export abstract class CatStore {
  abstract byId(id: string): Promise<Cat>;

  abstract all(): Promise<Cat[]>;

  abstract save(cat: Cat): Promise<void>;
}
