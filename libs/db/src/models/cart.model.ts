import {
  Column,
  CreatedAt,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({ tableName: 'cart', underscored: true }) // 设置表名称
export class CartModel extends Model {
  @PrimaryKey
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  tableId: string;

  @Column
  product_title: string;

  @Column
  img_url: string;

  @Column
  product_price: number;

  @Column
  product_num: number;

  @Column
  product_id: number;

  @CreatedAt
  created_at?: Date; // 增加时间

  @UpdatedAt
  updated_at?: Date;
}
