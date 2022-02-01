import { Controller, Get, Post, Put } from '@nestjs/common';
import { BookService } from './book.service';

@Controller()
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post("/book_add") //Добавить книгу
  async bookAdd(){
    return await this.bookService.bookAdd();
  }

  @Put("/book_add_to_user") //Получить кнугу пользователю
  async bookAddToUser(){
    return await this.bookService.bookAddToUser();
  }

  @Post("/book_return") //Вернуть книгу в библиотеку
  async bookReturn(){
    return await this.bookService.bookReturn()
  }
}