import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import {BookEntity} from '../book/book.entity';

//Тут описывается модель(сущность) таблицы в виде класса.

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    username: string;

    @Column({default: 18})
    age: number;

    @Column({default: "helicopter"})
    sex: string;

    @Column({default: false})
    subscription: boolean;

    @Column({default: 0})
    books_taken: number;

    //Свя
    @OneToMany(()=>BookEntity, book => book.user, {onDelete:"SET NULL"})
    books: BookEntity[]

    // @Column()  // Для простоты выполнения, я убрал логины и пароли.
    // email: string;
    // @Column()
    // password: string;
}