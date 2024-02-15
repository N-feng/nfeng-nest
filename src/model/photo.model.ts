import { Users } from './users.model';
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

  @ForeignKey(() => Users)
  @Column
  userId: number;

  @BelongsTo(() => Users)
  user: Users;

  @Length({ max: 80 })
  @Column
  url: string;
}

export default Photo;
