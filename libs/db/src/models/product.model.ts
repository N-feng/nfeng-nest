import {
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  // HasMany,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
// import { PhotoModel } from './photo.model';
import { ProductCate } from './productCate.model';

@Table({ tableName: 'product' }) // 设置表名称
export class ProductModel extends Model<ProductModel> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => ProductCate)
  @Column
  cid: number;

  @Column
  price: number;

  @Column
  title: string;

  @Column
  content: string;

  @Column
  saleCount: number;

  @Column
  isBest: number;

  @Column
  isHot: number;

  @Column
  status: number;

  @Column
  sort: number;

  @CreatedAt
  createdAt?: Date; // 增加时间

  @UpdatedAt
  updatedAt?: Date;

  // @HasMany(() => PhotoModel, 'productId')
  // img_url: PhotoModel[];

  @Column
  imgUrl: string;

  @BelongsTo(() => ProductCate, 'cid')
  proCat;
}
