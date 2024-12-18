import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as os from 'os';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Click Echange Model')
    .setDescription('Media Buying SAAS')
    .setVersion('0.1')
    .addTag('')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  app.enableCors();
  app.getHttpAdapter().get('/ping', (req, res) => {
    res.status(200).send({
      message: 'pong',
      instance: os.hostname(),
    });
  });
  await app.listen(process.env.EXPRESS_PORT || 3000);
}
bootstrap();
