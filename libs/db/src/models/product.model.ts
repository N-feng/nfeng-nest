import { Column, CreatedAt, HasMany, Model, Table } from 'sequelize-typescript';
import { Photo } from './photo.model';

@Table({ tableName: 'product', timestamps: false }) // 设置表名称
export class Product extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

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
  created_at: Date; // 增加时间

  @HasMany(() => Photo, 'productId')
  // @Column
  img_url: Photo[];
}
