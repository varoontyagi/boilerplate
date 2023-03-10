import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import { createDocument } from './swagger/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  app.enableCors();
  SwaggerModule.setup('api', app, createDocument(app));
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  await app.listen(config.get('port'));
}

try {
  bootstrap();
} catch (error: any) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-console
  console.log('Error in main.ts', error.message);
}
