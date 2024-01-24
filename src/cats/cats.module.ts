import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { CatStore } from './ports/catStore';
import { InMemoryCatStore } from './adapters/cat-store/in-memory-cat-store.service';

@Module({
  imports: [],
  controllers: [CatsController],
  providers: [
    InMemoryCatStore,
    {
      provide: CatsService,
      useFactory: (store: CatStore) => new CatsService(store),
      inject: [InMemoryCatStore],
    },
  ],
})
export class CatsModule {}
