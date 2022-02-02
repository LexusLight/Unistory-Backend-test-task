import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import {Request} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create_user_dto';
import { EditUserDto } from './dto/edit_user_dto';
import { DeleteUserDto } from './dto/delete_user_dto';
import { SubscribeUserDto } from './dto/subscribe_user_dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

//В контроллере мы просто принимаем запросы на модуль и вызываем нужный нам метод сервиса

@ApiTags('User')
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Создать пользователя.' })
  @Post("create") //Добавить пользователя.
  async userCreate(@Body() userDto: CreateUserDto){
    return await this.userService.userCreate(userDto);
  }

  @ApiOperation({ summary: 'Редактировать пользователя.' })
  @Put("edit") //Редактировать пользователя
  async userEdit(@Body() userDto: EditUserDto){
    return await this.userService.userEdit(userDto)
  }

  @ApiOperation({ summary: 'Удалить пользователя.' })
  @Delete("delete") //Удалить пользователя
  async userDelete(@Body() userDto: DeleteUserDto){
    return await this.userService.userDelete(userDto);
  }

  @ApiOperation({ summary: 'Оформить(отключить) абонемент пользователю.' })
  @Put("subscribe") //Выдача абонемента(подписки) пользователю
  async userSubscribe(@Body() userDto: SubscribeUserDto){
    return await this.userService.userSubscribe(userDto);
  }

  @ApiOperation({ summary: 'Вывести список всех пользователей.' })
  @Get("list")  //Список всех пользователей
  async userList(){
    return await this.userService.userList();
  }

  @ApiOperation({ summary: 'Вывести информацию о пользователе и его книгах.' })
  @Get("info") //Информация о пользователе + список взятых книг
  async userInfo(@Query('user_id') user_id: string){
    return await this.userService.userInfo(user_id);
  }
}