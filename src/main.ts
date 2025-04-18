import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import {
  GrpcExceptionFilter,
  RpcCustomExceptionFilter,
} from './common/exceptions';

import { AppModule } from './app.module';

import { envs } from './config';

async function bootstrap() {
  const logger = new Logger('Gateway');

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(
    new GrpcExceptionFilter(),
    new RpcCustomExceptionFilter(),
  );

  await app.listen(envs.gatewayPort);

  logger.log(`Gateway listening on port ${envs.gatewayPort}`);
}
bootstrap();
