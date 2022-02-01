import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity()
export class BookEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  about: string;

  @Column({default:true})
  available: boolean;

  @ManyToOne(()=>UserEntity,user => user.books,{onDelete:"SET NULL"})
  user:UserEntity
}