import {
  BelongsToMany,
  Column,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Photo } from './photo.model';
import Role from './role.model';
import UserRole from './user_role.model';

@Table({ tableName: 'user', timestamps: false })
export class User extends Model<User> {
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

  @BelongsToMany(() => Role, () => UserRole)
  role: Role;
}

export default User;
