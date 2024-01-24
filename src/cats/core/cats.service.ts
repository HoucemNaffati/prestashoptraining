import { Cat } from './model/cat';
import { CatStore } from './ports/catStore';
import { Logger } from './ports/logger';
import { MaxFetchReachedException } from './model/exceptions';

export class CatsService {
  private counter = 0;
  constructor(
    private readonly maxFetchCount: number,
    private readonly store: CatStore,
    private readonly logger: Logger,
  ) {}
  async getOne(catId: string) {
    this.logger.log(`getting one cat by id ${catId}`);
    return this.store.byId(catId);
  }
  async getAll() {
    if (this.counter >= this.maxFetchCount) MaxFetchReachedException.throw();
    this.logger.log(`getting all cats`);
    const cats = await this.store.all();
    this.logger.verbose(`fetched ${cats.length} cats from db`);
    this.counter = this.counter + 1;
    this.logger.debug('counter is :' + this.counter);
    return cats;
  }
  async create(cat: Cat) {
    this.logger.log(`creating a new cat with id ${cat.id}`);
    this.logger.debug(JSON.stringify(cat));
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
