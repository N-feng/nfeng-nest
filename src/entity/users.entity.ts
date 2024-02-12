import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PhotoEntity } from './photo.entity';

@Entity({ name: 'users' })
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  username: string;

  @Column('varchar')
  password: string;

  @Column()
  mobile: string;

  @Column()
  email: string;

  @Column({ length: 30 })
  sex: string;

  @Column()
  age: number;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => PhotoEntity, (photo) => photo.user)
  photos: PhotoEntity[];
}
