import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  //swagger
  const swaggerOptions = new DocumentBuilder()
    .setDescription('Prestashop training')
    .setTitle('Learning NestJs by example')
    .setTermsOfService('internal use only')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
}

bootstrap()
  .then(() => console.log(`App now listening on port ${PORT}`))
  .catch((err) => console.log(`error while starting server ${err}`));
