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
import Access from './access.model';

@Table({ tableName: 'role_access', timestamps: false })
export class RoleAccess extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Access)
  @Length({ max: 11 })
  @Column
  public accessId: number;

  @ForeignKey(() => Role)
  @Length({ max: 11 })
  @Column
  public roleId: number;

  @BelongsTo(() => Access)
  public access: Access;

  @BelongsTo(() => Role)
  public role: Role;
}

export default RoleAccess;
