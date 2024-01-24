import { Cat } from '../model/cat';

export interface CatStore {
  byId(id: string): Promise<Cat>;

  all(): Promise<Cat[]>;

  save(cat: Cat): Promise<void>;
}
