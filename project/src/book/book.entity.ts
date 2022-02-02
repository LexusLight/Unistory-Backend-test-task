import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

//Тут описывается модель(сущность) таблицы в виде класса.

@Entity()
export class BookEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique:true})
  title: string;

  @Column()
  about: string;

  @Column({default:true})
  available: boolean;

  @ManyToOne(()=>UserEntity,user => user.books,{onDelete:"SET NULL"})
  user:UserEntity
}