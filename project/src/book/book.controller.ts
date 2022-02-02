import { Body, Controller, Get, Post, Put } from '@nestjs/common';
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
  @Post("create") //Добавить книгу
  async bookAdd(@Body() bookDto:CreateBookDto){
    return await this.bookService.bookCreate(bookDto);
  }

  @ApiOperation({ summary: 'Выдать книгу пользователю.' })
  @Put("get_book") //Получить кнугу пользователю
  async bookAddToUser(@Body() bookDto: GetReturnDto){
    return await this.bookService.bookGetToUser(bookDto);
  }

  @ApiOperation({ summary: 'Вернуть книгу от пользователя.' })
  @Put("return_book") //Вернуть книгу в библиотеку
  async bookReturn(@Body() bookDto: GetReturnDto){
    return await this.bookService.bookReturn(bookDto)
  }
}