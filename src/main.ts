import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Config } from './helper/config.helper';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(Config.get('APP_PORT'), () => Logger.log(`running on port ${Config.get('APP_PORT')}`));
}
bootstrap();
