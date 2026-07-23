import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  try {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);
    const port = configService.get<number>('PORT') ?? 3000;

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );

    app.use(cookieParser());
    app.enableCors();

    await app.listen(port);
    logger.log(` Application is running on: http://localhost:${port}`);
  } catch (error) {
    logger.error(' Failed to start application:', error);
    process.exit(1);
  }
}

bootstrap();