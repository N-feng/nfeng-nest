import {
  Column,
  CreatedAt,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({ tableName: 'product_cate' }) // 设置表名称
export class ProductCate extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  title: string;

  @Column
  status: number;

  @Column
  sort: number;

  @CreatedAt
  createdAt?: Date; // 增加时间

  @UpdatedAt
  updatedAt?: Date;
}
