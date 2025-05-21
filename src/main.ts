import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { GuardGuard } from './guard/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const jwtService = app.get(JwtService)
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new GuardGuard(jwtService, reflector));

   const config = new DocumentBuilder()
    .setTitle('School Management API')
    .setDescription('API documentation for the School Management System')
    .setVersion('1.0')
    .addTag('school')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.enableCors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true, // if needed
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
