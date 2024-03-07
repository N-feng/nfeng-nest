import { Product } from './product.model';
import { User } from './user.model';
import {
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  Length,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({ tableName: 'photo' })
export class Photo extends Model<Photo> {
  @Column({ primaryKey: true })
  uid: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Product)
  @Column
  productId: number;

  @BelongsTo(() => Product)
  product: Product;

  @Length({ max: 80 })
  @Column
  url: string;

  @Column
  name: string;

  @Column
  status: string;

  @Column
  percent: number;

  @Column
  thumbUrl: string;

  @CreatedAt
  createdAt?: Date;

  @UpdatedAt
  updatedAt?: Date;
}
