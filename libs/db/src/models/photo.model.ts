// import { ProductModel } from './product.model';
import { SettingModel } from './setting.model';
import { UserModel } from './user.model';
import {
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({ tableName: 'photo' })
export class PhotoModel extends Model {
  @Column({ primaryKey: true })
  uid: number;

  @ForeignKey(() => UserModel)
  @Column
  userId: number;

  @BelongsTo(() => UserModel)
  user: UserModel;

  // @ForeignKey(() => ProductModel)
  // @Column
  // productId: number;

  // @BelongsTo(() => ProductModel)
  // product: ProductModel;

  @ForeignKey(() => SettingModel)
  @Column
  settingId: number;

  @BelongsTo(() => SettingModel)
  setting: SettingModel;

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
