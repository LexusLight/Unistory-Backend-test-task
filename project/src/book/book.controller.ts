import { Body, Controller, Get, Post, Put, Res } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create_book_dto';
import { GetReturnDto } from './dto/get_return_book_dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

//В контроллере мы просто принимаем запросы на модуль и вызываем нужный нам метод сервиса

@ApiTags('Book')
@Controller("book")
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiOperation({ summary: 'Добавить книгу.' })
  @Post() //Добавить книгу
  async bookAdd(@Res() response, @Body() bookDto:CreateBookDto){
    try{
      return response.status(201).send(await this.bookService.bookCreate(bookDto));
    }catch(error) {
      return response.status(400).send(error);
    }
  }

  @ApiOperation({ summary: 'Выдать книгу пользователю.' })
  @Put("get_book") //Получить кнугу пользователю
  async bookAddToUser(@Res() response, @Body() bookDto: GetReturnDto){
    try{
      return response.status(200).send(await this.bookService.bookGetToUser(bookDto));
    }
    catch (error){
      return response.status(400).send(error);
    }
  }

  @ApiOperation({ summary: 'Вернуть книгу от пользователя.' })
  @Put("return_book") //Вернуть книгу в библиотеку
  async bookReturn(@Res() response, @Body() bookDto: GetReturnDto){
    try{
      return response.status(200).send(await this.bookService.bookReturn(bookDto));
    }
    catch (error){
      return response.status(400).send(error);
    }
  }
}