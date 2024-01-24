import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug'],
  });
  app.useGlobalPipes(new ValidationPipe());
  // CONFIG
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT');
  //swagger
  const swaggerOptions = new DocumentBuilder()
    .setDescription('Prestashop training')
    .setTitle('Learning NestJs by example')
    .setTermsOfService('internal use only')
    .addBasicAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
}

bootstrap()
  .then(() => console.log(`App now listening ${JSON.stringify(process.env)}`))
  .catch((err) => console.log(`error while starting server ${err}`));
