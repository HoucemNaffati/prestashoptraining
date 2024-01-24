import { Module, Scope } from '@nestjs/common';
import { CatStore } from '../ports/catStore';
import { InMemoryCatStore } from './cat-store/in-memory-cat-store.service';

@Module({
  imports: [],
  providers: [
    ...[
      { provide: 'MY_PARAM', useValue: 111 },
      {
        provide: CatStore,
        useClass: InMemoryCatStore,
        scope: Scope.DEFAULT,
      },
    ],
  ],
  exports: [CatStore],
})
export class AdaptersModule {}
