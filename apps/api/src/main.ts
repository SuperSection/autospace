import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Autospace | Soumo Sarkar')
    .setDescription(
      `The Autospace API
      <h2>Looking for the graphql API?</h2>
      Go to <a href="/graphql" target="_blank">graphql</a>
      Or,
      You might also need to use the
      <a target="_blank" href="https://studio.apollographql.com/sandbox/explorer?endpoint=http://localhost:3000/graphql">Aollo explorer</a>
      for a greater experience
    `,
    )
    .setVersion('0.1')
    .addBasicAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
