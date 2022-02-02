import { Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './book.entity';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { UserEntity } from '../user/user.entity';

@Module({
  //Подключаем две сущности TypeOrm
  imports: [TypeOrmModule.forFeature([BookEntity]),TypeOrmModule.forFeature([UserEntity])],
  providers: [BookService],//Q
  controllers: [//Q
    BookController
  ],
  exports:[BookService]//Q
})
export class BookModule{
}