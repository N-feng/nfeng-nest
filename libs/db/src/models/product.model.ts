import {
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  HasMany,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { PhotoModel } from './photo.model';
import { ProductCate } from './product_cate.model';

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
  sale_count: number;

  @Column
  is_best: number;

  @Column
  is_hot: number;

  @Column
  status: number;

  @Column
  sort: number;

  @CreatedAt
  createdAt?: Date; // 增加时间

  @UpdatedAt
  updatedAt?: Date;

  @HasMany(() => PhotoModel, 'productId')
  // @Column
  img_url: PhotoModel[];

  @BelongsTo(() => ProductCate, 'cid')
  pro_cat;
}
