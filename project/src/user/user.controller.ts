import {Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Res} from '@nestjs/common';
import {Request} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create_user_dto';
import { EditUserDto } from './dto/edit_user_dto';
import { SubscribeUserDto } from './dto/subscribe_user_dto';
import {ApiOperation, ApiParam, ApiTags} from '@nestjs/swagger';

//В контроллере мы просто принимаем запросы на модуль и вызываем нужный нам метод сервиса

@ApiTags('User')
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Создать пользователя.' })
  @Post() //Добавить пользователя.
  async userCreate(@Res() response, @Body() userDto: CreateUserDto){

    try{
      return response.status(201).send(await this.userService.userCreate(userDto));
    }
    catch (error){
      return response.status(400).send(error);
    }
  }

  @ApiOperation({ summary: 'Редактировать пользователя.'})
  @Put(":username") //Редактировать пользователя
  @ApiParam({name: 'username', required: true})
  async userEdit(@Res() response, @Param("username") username, @Body() userDto: EditUserDto){
    try{
      return response.status(200).send( await this.userService.userEdit(username,userDto));
    }
    catch (error){
      return response.status(400).send(error);
    }
  }

  @ApiOperation({ summary: 'Удалить пользователя.' })
  @Delete(":username") //Удалить пользовател
  @ApiParam({name: 'username', required: true})
  async userDelete(@Res() response, @Param("username") username){
    try{
      return response.status(200).send( await this.userService.userDelete(username));
    }
    catch (error){
      return response.status(400).send(error);
    }
  }

  @ApiOperation({ summary: 'Оформить(отключить) абонемент пользователю.' })
  @Put("subscribe") //Выдача абонемента(подписки) пользователю
  async userSubscribe(@Res() response, @Body() userDto: SubscribeUserDto){
    console.log("hel");
    try{
      return response.status(200).send(await this.userService.userSubscribe(userDto));
    }
    catch (error){
      return response.status(400).send(error);
    }
  }

  @ApiOperation({ summary: 'Вывести список всех пользователей.' })
  @Get("list")  //Список всех пользователей
  async userList(){
    return await this.userService.userList();
  }

  @ApiOperation({ summary: 'Вывести информацию о пользователе и его книгах.' })
  @Get("info") //Информация о пользователе + список взятых книг
  async userInfo(@Res() response,@Query('user_id') user_id: string){
    try{
      return response.status(200).send( await this.userService.userInfo(user_id));
    }
    catch (error){
      return response.status(400).send(error);
    }
  }
}