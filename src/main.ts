import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import  cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
  });
  // Swagger configuration
  const config = new DocumentBuilder()
  .setTitle('Restaurant Management API')
  .setDescription('Authentication and management endpoints')
  .setVersion('1.0')
  .addBearerAuth() 
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  app.use(cookieParser('my_secret_key'));
  await app.listen(process.env.PORT || 3000);
  console.log(`✅ Swagger docs available at: http://localhost:${process.env.PORT || 3000}/api-docs`);
}

bootstrap();
