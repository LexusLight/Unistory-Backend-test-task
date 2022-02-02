import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create_user_dto';
import { EditUserDto } from './dto/edit_user_dto';
import { DeleteUserDto } from './dto/delete_user_dto';
import { SubscribeUserDto } from './dto/subscribe_user_dto';

//В основном методы похожи, так что я прокомментировал первый.

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
      return ("Пользователь с таким юзернеймом уже существует.")
    }else {
    //Если такого пользователя нет, то создаём новую сущность и сохраняем её
      user = new UserEntity();
      user.username = username;
      user.age = age;
      user.sex = sex;
      await this.userRepository.save(user);
      return (user.username + " успешно создан!")
    }
  }

  async userEdit(dto: EditUserDto){
    const {old_username,new_username,new_age,new_sex} = dto;
    const user:UserEntity = await this.userRepository.findOne({username:old_username});
    if(user == null){
      return ("Пользователя с таким юзернеймом не существует.")
    }else {
      user.username = new_username;
      user.age = new_age;
      user.sex = new_sex;
      await this.userRepository.save(user);
      return (user.username + " изменён!")
    }
  }

  async userDelete(dto:DeleteUserDto){
    const {username} = dto;
    const user:UserEntity = await this.userRepository.findOne({username:username});
    if(user == null){
      return ("Пользователя с таким юзернеймом не существует.")
    }else {
      await this.userRepository.delete(user);
      return (user.username + " удалён!")
    }
  }

  async userSubscribe(dto:SubscribeUserDto){
    const {username,subscribe} = dto;
    const user:UserEntity = await this.userRepository.findOne({username:username});
    if(user == null){
      return ("Пользователя с таким юзернеймом не существует.")
    }else {
      user.subscription = subscribe;
      await this.userRepository.save(user);
      return (user.username + ` теперь ${(!subscribe)?"не":""} имеет абонемент!`)
    }
  }
  async userList(){
    return await this.userRepository.find()
  }
  async userInfo(user_id:any){
    const user = await this.userRepository.findOne({username: user_id},{relations: ["books"]})
    if (user == null){
      return ("Пользователя не существует");
    }else{
      return user
    }
  }
}