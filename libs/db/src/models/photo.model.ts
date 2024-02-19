import { User } from './user.model';
import {
  BelongsTo,
  Column,
  ForeignKey,
  Length,
  Model,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'photo', timestamps: false })
export class Photo extends Model<Photo> {
  @Column({ primaryKey: true })
  id: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Length({ max: 80 })
  @Column
  url: string;
}
