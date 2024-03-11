import {
  Column,
  CreatedAt,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { PhotoModel } from './photo.model';

@Table({ tableName: 'setting' }) // 设置表名称
export class SettingModel extends Model {
  @PrimaryKey
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  title: string;

  @Column
  site_logo: string;

  @Column
  site_keywords: string;

  @Column
  site_description: string;

  @Column
  printer_key: string;

  @Column
  printer_user: string;

  @Column
  client_url: string;

  @Column
  address: string;

  @Column
  phone: string;

  @Column
  wifi_user: string;

  @Column
  wifi_password: string;

  @Column
  order_label: string;

  @Column
  alipay: string;

  @Column
  weixinpay: string;

  @Column
  sort: number;

  @CreatedAt
  createdAt?: Date; // 增加时间

  @UpdatedAt
  updatedAt?: Date;

  @HasMany(() => PhotoModel, 'settingId')
  // @Column
  img_url: PhotoModel[];
}
