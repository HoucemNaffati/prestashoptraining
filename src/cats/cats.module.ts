import { Module, Scope } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { CatStore } from './ports/catStore';
import { AdaptersModule } from './adapters/adapters.module';

@Module({
  imports: [AdaptersModule],
  controllers: [CatsController],
  providers: [
    {
      provide: CatsService,
      useFactory: async (store: CatStore) => new CatsService(store),
      inject: [CatStore],
      scope: Scope.REQUEST,
    },
  ],
})
export class CatsModule {}
