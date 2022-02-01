import { NestFactory } from '@nestjs/core';
import {AppModule} from './app.module';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';

import {createConnection} from 'typeorm';
// import { BookEntity } from './book/book.entity';
// import { UserEntity } from './user/user.entity';
//
// createConnection({
//
// }).then(connection => {
//   console.log("Database connected!")
// }).catch(error => console.log(error))

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Api documentation')
    .setDescription("Library API description")
    .setVersion("1.0")
    // .addTag("books")
    .build();
  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup("api",app,document);

  await app.listen(1337);
}
bootstrap();
