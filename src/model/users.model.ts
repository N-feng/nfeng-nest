import { Photo } from './photo.model';
import { Column, HasMany, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'users', timestamps: false })
export class Users extends Model<Users> {
  @Column({ primaryKey: true })
  id: number;

  @Column
  username: string;

  @Column
  password: string;

  @Column
  mobile: string;

  @Column
  email: string;

  @Column
  sex: string;

  @Column
  age: number;

  @Column({ defaultValue: true })
  isActive: boolean;

  @HasMany(() => Photo, 'userId')
  photos: Photo[];
}

export default Users;
