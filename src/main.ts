import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { useContainer } from "class-validator";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app use global pipes to automaticly validate requests
  // app.useGlobalPipes(new ValidationPipe());

  // wrap AppModule with UseContainer
  useContainer(app.select(AppModule), {fallbackOnErrors: true});

  // app.useGlobalPipes(new ValidationPipe(
  //   {
  //   whitelist: true,
  //   forbidNonWhitelisted: true,
  //   transform: true,
  //   transformOptions: {
  //     enableImplicitConversion: true
  //   }
  // }));
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // Habilita la transformación automática de datos
    whitelist: true, // Elimina propiedades no definidas en el DTO
  }));

  app.enableCors({
    origin: 'http://localhost:5173',
    methods : 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials : true,
  });
  await app.listen(3000);
}
bootstrap();
