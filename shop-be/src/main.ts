import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DataSource } from 'typeorm';
import { initAdmin } from './database/seed/admin.seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1')

  app.enableCors({
    origin: "http://localhost:3000", // FE
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
  });

  const config = new DocumentBuilder()
    .setTitle('StorePlate API')
    .setDescription('API documentation for Shop Backend')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access_token',
    )
    .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 8000, '0.0.0.0');

  const dataSource = app.get(DataSource);
  await initAdmin(dataSource);

}
bootstrap();
