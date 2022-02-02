import { Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])], //Подключаем Сущность через TypeOrm
  providers: [UserService],//Q
  controllers: [//Подключаем контроллер
    UserController
  ],
  exports:[UserService]//Q
})
export class UserModule{
}