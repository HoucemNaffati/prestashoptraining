import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService, CatStore, InMemoryCatStore } from './cats.service';

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
