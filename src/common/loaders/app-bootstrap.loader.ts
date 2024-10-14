import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationError } from 'class-validator';
import { CustomError } from '../classes';
import { ErrorType } from '../enums/error-type.enum';
import { SwaggerModuleConfig } from '../interfaces/swagger/swagger-module-config.interface';
import { AppConfig } from '../services/app-config/app-config.service';
import { CustomLoggerService } from '../services/logger/custom-logger.service';

export async function appBootstrapLoader(AppModule: any, swaggerConfig: SwaggerModuleConfig): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const appConfig = app.get(AppConfig);

  const logger = await app.resolve(CustomLoggerService);
  app.useLogger(logger);

  const appShortName = appConfig.APP_SHORT_NAME;

  app.setGlobalPrefix(appShortName);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(
          new CustomError({
            localizedMessage: {
              en: 'Validation failed',
              ar: 'فشل التحقق من الصحة',
            },
            errorType: ErrorType.WRONG_INPUT,
            event: 'VALIDATION_FAILED',
            // error: parseValidationErrors(validationErrors),
          }),
        );
      },
    }),
  );

  app.enableVersioning();
  app.enableCors({
    origin: true,
    methods: '*',
    allowedHeaders: '*',
    optionsSuccessStatus: 204,
  });

  if (swaggerConfig.enabled) {
    const { title = appConfig.APP_SHORT_NAME, version, description } = swaggerConfig.config;
    const config = new DocumentBuilder()
      .setTitle(title)
      .setDescription(description ?? '')
      .setVersion(version)
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup(`${appShortName}/docs`, app, document, {
      swaggerOptions: {
        persistAuthorization: true, // TODO: SHOULD BE REMOVED BEFORE PRODUCTION
      },
    });
  }

  await app.listen(3000);

  return;
}