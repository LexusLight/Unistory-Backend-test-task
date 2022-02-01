import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from './book.entity';
import { UserEntity } from '../user/user.entity';
import {Repository} from 'typeorm';

@Injectable()
export class BookService{
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<UserEntity>)
  {}

  async bookAdd(){
    return await null;
  }
  async bookAddToUser(){
    return await null;
  }
  async bookReturn(){
    return await null;
  }
}

