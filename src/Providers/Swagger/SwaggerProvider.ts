import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const SwaggerProvider = (app: INestApplication<any>) => {
  const options = new DocumentBuilder()
    .setTitle('Eva Exchange API')
    .setDescription('This API is used for Eva Exchange')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  for (const path of ['doc', 'docs', 'swagger']) {
    SwaggerModule.setup(path, app, document);
  }
};

export default SwaggerProvider;
