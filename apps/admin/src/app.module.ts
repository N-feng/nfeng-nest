import { CommonModule } from '@app/common';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AccessController } from './access/access.controller';
import { AccessService } from './access/access.service';
import { ArticleController } from './article/article.controller';
import { ArticleService } from './article/article.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { LocalStrategy } from './auth/local.strategy';
import { LessonController } from './lesson/lesson.controller';
import { LessonService } from './lesson/lesson.service';
import { PhotoController } from './photo/photo.controller';
import { PhotoService } from './photo/photo.service';
import { ProductCateController } from './product-cate/product-cate.controller';
import { ProductCateService } from './product-cate/product-cate.service';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';
import { RoleController } from './role/role.controller';
import { RoleService } from './role/role.service';
import { SettingController } from './setting/setting.controller';
import { SettingService } from './setting/setting.service';
import { StudentController } from './student/student.controller';
import { StudentService } from './student/student.service';
import { TableController } from './table/table.controller';
import { TableService } from './table/table.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { AuthGuard } from './common/guard/auth.guard';

@Module({
  imports: [CommonModule],
  controllers: [
    ArticleController,
    LessonController,
    StudentController,
    AccessController,
    RoleController,
    AuthController,
    UserController,
    ProductController,
    PhotoController,
    ProductCateController,
    TableController,
    SettingController,
  ],
  providers: [
    ArticleService,
    LessonService,
    StudentService,
    AccessService,
    RoleService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    UserService,
    ProductService,
    PhotoService,
    ProductCateService,
    TableService,
    SettingService,
  ],
  exports: [ArticleService],
})
export class AppModule {}
