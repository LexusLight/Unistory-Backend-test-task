import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from './book.entity';
import {Repository} from 'typeorm';
import { CreateBookDto } from './dto/create_book_dto';
import { UserEntity } from '../user/user.entity';
import { GetReturnDto } from './dto/get_return_book_dto';

// P.S. В параметраз запроса я использовал username(вместо id) для наглядности

@Injectable()
export class BookService{
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
)
  {}

  async bookCreate(dto:CreateBookDto){
    //Деструктурируем объект по свойствам
    const {title,about} = dto;
    //Пытаемся найти в базе книгу с таким-же названием
    let book:BookEntity = await this.bookRepository.findOne({title:title});
    //Если объект найден, значит этот пользователь уже был создан.
    if(book != null){
      throw ("Книга с таким названием уже существует.")
    }else {
      //Если такой книги нет, то создаём новый объект сущности и сохраняем его
      book = new BookEntity();
      book.title = title;
      book.about = about;
      await this.bookRepository.save(book);
      return book;
    }
  }
  async bookGetToUser(dto : GetReturnDto){
    const {username,title} = dto;
    const book:BookEntity = await this.bookRepository.findOne({title:title});
    const user:UserEntity = await this.userRepository.findOne({username:username},{relations:["books"]});
    if(book == null){
      throw ("Книги с таким названием не существует.")
    }else if(user == null){
      throw ("Пользователя с таким юзернеймом не существует.")
    }else if(user.books_taken >= 5){
      throw ("Пользователь не может взять более 5 книг.")
    }else if(!user.subscription){
      throw ("У пользователя нет абонимента.")
    }else if(!book.available){
      throw ("Книгу уже кто-то взял. Попробуйте другую.")
    }else{
      user.books.push(book);
      user.books_taken++;
      book.available = false;
      await this.userRepository.save(user);
      await this.bookRepository.save(book);
      return (`Книга ${title} успешно выдана пользователю ${username}`)
    }

  }
  async bookReturn(dto){
    const {username,title} = dto;
    const book:BookEntity = await this.bookRepository.findOne({title:title});
    const user:UserEntity = await this.userRepository.findOne({username:username},{relations:["books"]});
    if(book == null){
      throw ("Книги с таким названием не существует.")
    }else if(user == null){
      throw ("Пользователя с таким юзернеймом не существует.")
    }else if(!user.books.find(element => element.title==book.title)){
      throw ("У данного пользователя нет данной книги.")
    }
    else{
      user.books.splice(user.books.indexOf(book));
      user.books_taken--;
      book.available = true;
      await this.userRepository.save(user);
      await this.bookRepository.save(book);
      return (`Пользователь ${username} вернул книгу ${title}`)
    }
  }
}

