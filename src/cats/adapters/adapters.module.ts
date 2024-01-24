import { Module, Scope, Logger as NestJSLogger } from '@nestjs/common';
import { CatStore } from '../core/ports/catStore';
import { InMemoryCatStore } from './cat-store/in-memory-cat-store';
import { Logger } from '../core/ports/logger';

@Module({
  imports: [],
  providers: [
    { provide: Logger, useClass: NestJSLogger },
    { provide: 'MY_PARAM', useValue: 111 },
    {
      provide: CatStore,
      useClass: InMemoryCatStore,
      scope: Scope.DEFAULT,
    },
  ],
  exports: [CatStore, Logger],
})
export class AdaptersModule {}
