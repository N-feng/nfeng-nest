import { Global, Module } from '@nestjs/common';
import { DbService } from './db.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { RoleAccess } from './models/roleAccess.model';
import { Access } from './models/access.model';
import { PhotoModel } from './models/photo.model';
import { Role } from './models/role.model';
import { UserModel } from './models/user.model';
import { UserRoleModel } from './models/userRole.model';
import { Article } from './models/article.model';
import { Lesson } from './models/lesson.model';
import { Student } from './models/student.model';
import { ProductModel } from './models/product.model';
import { ProductCate } from './models/productCate.model';
import { TableModel } from './models/table.model';
import { SettingModel } from './models/setting.model';
import { CartModel } from './models/cart.model';
import { PeopleInfoModel } from './models/peopleInfo.model';
import { OrderModel } from './models/order.model';
import { OrderItemsModel } from './models/orderItems.model';

const models = SequelizeModule.forFeature([
  Article,
  Lesson,
  Student,
  UserModel,
  UserRoleModel,
  PhotoModel,
  Role,
  RoleAccess,
  Access,
  ProductModel,
  ProductCate,
  TableModel,
  SettingModel,
  CartModel,
  PeopleInfoModel,
  OrderModel,
  OrderItemsModel,
]);

@Global()
@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: () => ({
        dialect: 'mysql',
        host: process.env.DB_HOST,
        port: 3306,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: 'beego',
        models: [
          UserModel,
          UserRoleModel,
          PhotoModel,
          Role,
          RoleAccess,
          Access,
          ProductModel,
          ProductCate,
          TableModel,
          SettingModel,
          CartModel,
          PeopleInfoModel,
          OrderModel,
          OrderItemsModel,
        ],
        define: {
          underscored: true,
        },
      }),
    }),
    models,
  ],
  providers: [DbService],
  exports: [DbService, models],
})
export class DbModule {}
