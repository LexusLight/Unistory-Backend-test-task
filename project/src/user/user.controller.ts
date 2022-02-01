import { Body, Controller, Delete, Get, Post, Put, Query, Req } from '@nestjs/common';
import {Request} from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/user_add") //Добавить пользователя. Добавление логина\пароля убрано.
  async userCreate(@Body() body: Request){
    return await this.userService.userCreate(body);
  }
  @Put("/user_edit") //Редактировать пользователя
  async userEdit(){
    return await this.userService.userEdit()
  }
  @Delete("/user_delete") //Удалить пользователя
  async userDelete(){
    return await this.userService.userDelete();
  }
  @Put("/user_subscribe") //Выдача абонемента(подписки) пользователю
  async userSubscribe(){
    return await this.userService.userSubscribe();
  }
  @Get("/user_list")  //Список всех пользователей
  async userList(){
    return await this.userService.userList();
  }
  @Get("/userInfo") //Информация о пользователе + список взятых книг
  async userInfo(@Query('user_id') user_id: Request){
    return await this.userService.userInfo(user_id);
  }
}