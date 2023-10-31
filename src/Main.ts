import { NestFactory } from '@nestjs/core';
import { AppModule } from '@Eva/App/Module';
import { ValidationPipe } from '@nestjs/common';
import SwaggerProvider from '@Eva/Providers/Swagger/SwaggerProvider';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  SwaggerProvider(app);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = configService.get('PORT');

  await app.listen(port);
  console.log(`Application is running on port ${port}`);
}
// eslint-disable-next-line unicorn/prefer-top-level-await
bootstrap();
