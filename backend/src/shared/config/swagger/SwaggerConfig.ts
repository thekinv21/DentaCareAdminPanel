import { DocumentBuilder } from '@nestjs/swagger';

export const createSwaggerConfig = (port: number) =>
  new DocumentBuilder()
    .setTitle('DentaCare API')
    .setDescription(
      'DentaCare is a dental clinic management application built with NestJS. It provides APIs for managing patients, dentists, appointments, treatments, and other dental clinic operations.',
    )
    .setVersion('1.0.0')
    .setContact('Vadim', 'https://github.com/thekinv21', 'thekinv21@gmail.com')
    .addServer(`http://localhost:${port}`, 'Local Development')
    .build();
