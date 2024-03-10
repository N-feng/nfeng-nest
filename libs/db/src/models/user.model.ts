import {
  BelongsToMany,
  Column,
  CreatedAt,
  HasMany,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { PhotoModel } from './photo.model';
import { Role } from './role.model';
import { UserRoleModel } from './user_role.model';

@Table({ tableName: 'user' })
export class UserModel extends Model<UserModel> {
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

  @HasMany(() => PhotoModel, 'userId')
  photos: PhotoModel[];

  @BelongsToMany(() => Role, () => UserRoleModel)
  roles: Role[];
}
