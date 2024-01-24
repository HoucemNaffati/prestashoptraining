import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';

const validationSchema = Joi.object({
  PORT: Joi.number().default(3000),
  MAX_FETCH_COUNTER: Joi.number().required(),
  HTTP_BASIC_USER: Joi.string().required(),
  HTTP_BASIC_PASS: Joi.string().required(),
});
@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema,
      isGlobal: true,
      cache: true,
    }),
    CatsModule,
  ],
})
export class AppModule {}
