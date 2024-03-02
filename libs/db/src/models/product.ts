import { Column, CreatedAt, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'product', timestamps: false }) // 设置表名称
export class Product extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  cid: number;

  @Column
  price: number;

  @Column
  imgUrl: string;

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
  addTime: Date; // 增加时间
}
