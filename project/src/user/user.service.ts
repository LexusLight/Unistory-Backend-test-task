import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService{
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ){} //Q

   async userCreate(body:Request){
    let user:UserEntity = await this.userRepository.findOne({username:body["username"]});
    if(user != null){
      return ("Пользователь с таким юзернеймом уже существует.")
    }else {
      user = new UserEntity();
      user.username = body["username"];
      user.age = body["age"];
      user.sex = body["sex"];
      await this.userRepository.save(user);
      return (user.username + " успешно создан!")
    }
  }
  async userEdit(){
    return await null;
  }
  async userDelete(){
    return await null;
  }
  async userSubscribe(){
    return await null;
  }
  async userList(){
    return await this.userRepository.find()
  }
  async userInfo(user_id:any){
    return await this.userRepository.find({username: user_id})
  }
}