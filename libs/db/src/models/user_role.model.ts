import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Length,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Role } from './role.model';
import { UserModel } from './user.model';

@Table({ tableName: 'user_role', timestamps: false })
export class UserRoleModel extends Model<UserRoleModel> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => UserModel)
  @Length({ max: 11 })
  @Column
  public userId: number;

  @BelongsTo(() => UserModel)
  public user: UserModel;

  @ForeignKey(() => Role)
  @Length({ max: 11 })
  @Column
  public roleId: number;

  @BelongsTo(() => Role)
  public role: Role;
}
