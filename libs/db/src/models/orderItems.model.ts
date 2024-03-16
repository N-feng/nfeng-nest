import {
  // BelongsTo,
  Column,
  CreatedAt,
  // ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
// import { OrderModel } from './order.model';

@Table({ tableName: 'order_items' }) // 设置表名称
export class OrderItemsModel extends Model {
  @PrimaryKey
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  // @ForeignKey(() => OrderModel)
  // @Column
  // orderId: string;

  // @BelongsTo(() => OrderModel, 'orderId')
  // order: OrderModel;

  @Column
  tableId: string;

  @Column
  productId: number;

  @Column
  productTitle: string;

  @Column
  productImg: string;

  @Column
  productPrice: number;

  @Column
  status: number; /*状态是1   表示已经下厨     状态是2表示退菜*/

  @CreatedAt
  createdAt?: Date; // 增加时间

  @UpdatedAt
  updatedAt?: Date;
}
