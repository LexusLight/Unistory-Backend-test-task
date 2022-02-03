import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create_user_dto';
import { EditUserDto } from './dto/edit_user_dto';
import { SubscribeUserDto } from './dto/subscribe_user_dto';

//В основном методы похожи, так что я прокомментировал первый.
// P.S. В параметраз запроса я использовал username(вместо id) для наглядности

@Injectable()
export class UserService{
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity> //Подключаем репозиторий сущности
  ){} //Q

   async userCreate(dto:CreateUserDto){
     //Деструктурируем объект по свойствам
    const {username,age,sex} = dto;
    //Пытаемся найти в базе пользователя с таким-же именем
    let user:UserEntity = await this.userRepository.findOne({username:username});
    //Если объект найден, значит этот пользователь уже был создан.
    if(user != null){
      throw ("Пользователь с таким юзернеймом уже существует.")
    }else {
    //Если такого пользователя нет, то создаём новый объект сущности и сохраняем его
      user = new UserEntity();
      user.username = username;
      user.age = age;
      user.sex = sex;
      await this.userRepository.save(user);
      return (user)
    }
  }

  async userEdit(username,dto: EditUserDto){
    const {new_username,new_age,new_sex} = dto;
    const user:UserEntity = await this.userRepository.findOne({username:username});
    if(user == null){
      throw ("Пользователя с таким юзернеймом не существует.")
    }else {
      //Если какого-либо из необязательных параметров нет, то мы его оставляем прежним
      user.username = new_username ? new_username : username;
      user.age = new_age ? new_age : user.age;
      user.sex = new_sex ? new_sex : user.sex;
      await this.userRepository.save(user);
      return (user)
    }
  }

  async userDelete(username){
    const user:UserEntity = await this.userRepository.findOne({username:username});
    if(user == null){
      throw ("Пользователя с таким юзернеймом не существует.")
    }else {
      await this.userRepository.delete(user);
      return (user.username + " удалён!")
    }
  }

  async userSubscribe(dto:SubscribeUserDto){
    const {username,subscribe} = dto;
    const user:UserEntity = await this.userRepository.findOne({username:username});
    if(user == null){
      throw ("Пользователя с таким юзернеймом не существует.")
    }else {
      user.subscription = subscribe;
      await this.userRepository.save(user);
      return (user.username + ` теперь ${(!subscribe)?"не":""} имеет абонемент!`)
    }
  }

  async userList(){
    return await this.userRepository.find()
  }
  async userInfo(username:string){
    const user = await this.userRepository.findOne({username: username},{relations: ["books"]})
    if (user == null){
      throw ("Пользователя не существует");
    }else{
      return user
    }
  }
}