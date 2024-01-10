import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT);
}

bootstrap()
  .then(() => console.log(`App now listening on port ${PORT}`))
  .catch((err) => console.log(`error while starting server ${err}`));
