import { Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../auth/user.entity';
import { Message } from '../message/message.entity';
import { JoinTable } from 'typeorm/browser';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];
}
