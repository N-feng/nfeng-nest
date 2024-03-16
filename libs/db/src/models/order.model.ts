import {
  Column,
  CreatedAt,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { OrderItemsModel } from './orderItems.model';

@Table({ tableName: 'order' }) // 设置表名称
export class OrderModel extends Model {
  @PrimaryKey
  @Column({ autoIncrement: true })
  id: number;

  @Column
  orderId: string;

  @Column
  tableId: string;

  @Column
  totalPrice: string;

  @Column
  totalNum: number;

  @Column
  pNum: number;

  @Column
  pMark: string;

  @Column
  payStatus: number; // 0表示未支付        1表示已经支付

  @Column
  payType: number; // 1 支付宝支付       2微信支付

  @Column
  orderStatus: number; // 0表示已下单并且未支付        1 表示已支付 已完结     2表示取消

  @CreatedAt
  createdAt?: Date; // 增加时间

  @UpdatedAt
  updatedAt?: Date;

  @HasMany(() => OrderItemsModel, 'orderId')
  orderItems: OrderItemsModel[];
}
