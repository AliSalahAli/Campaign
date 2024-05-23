import { BaseExceptionFilter, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { fastifyHelmet } from '@fastify/helmet';
import { validationOptions } from './modules/common/interfaces/validation-option.interface';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: false }),
  );
  app.useGlobalPipes(new ValidationPipe(validationOptions));
  app.useGlobalFilters(new BaseExceptionFilter());

  const configService = app.get(ConfigService);
  const env = configService.get<string>('ENV');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Marketing Campaigns API Documentation')
    .setDescription(
      'This is an assignment for the position of Full stack develoepr at Nogood.',
    )
    .setVersion('1.0-DEV')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  app.enableCors();

  // If we are gonna use Apollo Graphql we should make another way of helmet config check https://docs.nestjs.com/security/helmet
  await app.register(fastifyHelmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`, 'unpkg.com'],
        styleSrc: [
          `'self'`,
          `'unsafe-inline'`,
          'cdn.jsdelivr.net',
          'fonts.googleapis.com',
          'unpkg.com',
        ],
        fontSrc: [`'self'`, 'fonts.gstatic.com', 'data:'],
        imgSrc: [`'self'`, 'data:', 'cdn.jsdelivr.net'],
        scriptSrc: [
          `'self'`,
          `https: 'unsafe-inline'`,
          `cdn.jsdelivr.net`,
          `'unsafe-eval'`,
        ],
      },
    },
  });

  await app.listen(3000, '0.0.0.0');
}

bootstrap();
