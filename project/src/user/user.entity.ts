import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import {BookEntity} from '../book/book.entity';

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

    @Column()
    subscription: boolean;

    @Column({default: 0})
    books_taken: number;

    @OneToMany(()=>BookEntity, book => book.user, {onDelete:"SET NULL"})
    books: BookEntity[]
    // @Column()  // Откидываем ненужные поля
    // email: string;
    // @Column()
    // password: string;
}