import { Global, Module } from '@nestjs/common';
import { DbService } from './db.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { RoleAccess } from './models/role_access.model';
import { Access } from './models/access.model';
import { Photo } from './models/photo.model';
import { Role } from './models/role.model';
import { User } from './models/user.model';
import { UserRole } from './models/user_role.model';
import { Article } from './models/article.model';
import { Lesson } from './models/lesson.model';
import { Student } from './models/student.model';
import { Product } from './models/product.model';

const models = SequelizeModule.forFeature([
  Article,
  Lesson,
  Student,
  User,
  UserRole,
  Photo,
  Role,
  RoleAccess,
  Access,
  Product,
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
        models: [User, UserRole, Photo, Role, RoleAccess, Access, Product],
      }),
    }),
    models,
  ],
  providers: [DbService],
  exports: [DbService, models],
})
export class DbModule {}
