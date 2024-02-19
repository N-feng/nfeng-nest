import {
  AutoIncrement,
  BelongsToMany,
  Column,
  CreatedAt,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { RoleAccess } from './role_access.model';
import { Access } from './access.model';

@Table({ tableName: 'role' })
export class Role extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ allowNull: true })
  id: string;

  @Column
  title: string;

  @Column
  description: string;

  @CreatedAt
  createdAt?: Date;

  @UpdatedAt
  updatedAt?: Date;

  @BelongsToMany(() => Access, () => RoleAccess)
  access: Access[];
}
