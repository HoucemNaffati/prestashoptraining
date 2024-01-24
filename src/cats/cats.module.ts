import { Module, Scope } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './core/cats.service';
import { CatStore } from './core/ports/catStore';
import { AdaptersModule } from './adapters/adapters.module';
import { Logger } from './core/ports/logger';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { BasicStrategy } from './auth/auth-basic.strategy';
import { APP_GUARD } from '@nestjs/core';
import { BasicAuthGuard } from './auth/basic-auth.guard';

@Module({
  imports: [AdaptersModule, PassportModule],
  controllers: [CatsController],
  providers: [
    BasicStrategy,
    {
      provide: APP_GUARD,
      useClass: BasicAuthGuard,
    },
    {
      provide: CatsService,
      useFactory: async (
        store: CatStore,
        logger: Logger,
        configService: ConfigService,
      ) =>
        new CatsService(
          configService.get<number>('MAX_FETCH_COUNTER'),
          store,
          logger,
        ),
      inject: [CatStore, Logger, ConfigService],
    },
  ],
})
export class CatsModule {}
