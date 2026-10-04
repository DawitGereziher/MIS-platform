import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend clients
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Set global API prefix
  app.setGlobalPrefix('api');

  // Configure Swagger OpenAPI documentation
  const config = new DocumentBuilder()
    .setTitle('NexusMEAL Enterprise MIS — Core REST API')
    .setDescription(
      'Enterprise RESTful Backend Services for Digital Monitoring, Evaluation, Accountability, and Learning.'
    )
    .setVersion('2.4.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 4000;
  await app.listen(port);

  console.log(`=======================================================`);
  console.log(`🚀 NexusMEAL Enterprise MIS API Server running!`);
  console.log(`📍 REST API:     http://localhost:${port}/api`);
  console.log(`📑 Swagger Docs: http://localhost:${port}/api/docs`);
  console.log(`=======================================================`);
}

bootstrap();
