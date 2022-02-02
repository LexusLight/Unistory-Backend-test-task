import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from './book/book.module';
import { BookEntity } from './book/book.entity';
import { UserEntity } from './user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({  //Так в связке TypeORM-NestJS подключается бд
      type:"sqlite",
      database:"./database.db",
      entities: [
        BookEntity,
        UserEntity
      ],
      synchronize: true,
      logging: false
    }),//Q
    UserModule, //Подключаем все модули приложения
    BookModule
  ],
  controllers: [AppController,],
  providers: [AppService], //Q
})
export class AppModule {}
