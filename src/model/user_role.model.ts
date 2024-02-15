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
import Role from './role.model';
import User from './user.model';

@Table({ tableName: 'user_role', timestamps: false })
export class UserRole extends Model<UserRole> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => User)
  @Length({ max: 11 })
  @Column
  public userId: number;

  @ForeignKey(() => Role)
  @Length({ max: 11 })
  @Column
  public roleId: number;

  @BelongsTo(() => User)
  public user: User;

  @BelongsTo(() => Role)
  public role: Role;
}

export default UserRole;
