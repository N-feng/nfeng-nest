import {
  BelongsToMany,
  Column,
  CreatedAt,
  HasMany,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Photo } from './photo.model';
import { Role } from './role.model';
import { UserRole } from './user_role.model';

@Table({ tableName: 'user' })
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

  @CreatedAt
  createdAt?: Date;

  @UpdatedAt
  updatedAt?: Date;

  @Column({ defaultValue: true })
  isActive: boolean;

  @Column
  isSuper: number;

  @HasMany(() => Photo, 'userId')
  photos: Photo[];

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];
}
