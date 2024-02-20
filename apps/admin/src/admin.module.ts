import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CommonModule } from '@app/common';
import { UsersController } from './users/users.controller';
import { ArticleController } from './article/article.controller';
import { LessonController } from './lesson/lesson.controller';
import { StudentController } from './student/student.controller';
import { AccessController } from './access/access.controller';
import { RoleController } from './role/role.controller';
import { AuthController } from './auth/auth.controller';
import { UsersService } from './users/users.service';
import { ArticleService } from './article/article.service';
import { LessonService } from './lesson/lesson.service';
import { StudentService } from './student/student.service';
import { AccessService } from './access/access.service';
import { RoleService } from './role/role.service';
import { AuthService } from './auth/auth.service';
import { ToolsService } from './tools/tools.service';
import { Config } from './config/config';
import { AuthMiddleware } from './middleware/auth.middleware';
import { LocalStrategy } from './auth/local.strategy';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [CommonModule],
  controllers: [
    UsersController,
    ArticleController,
    LessonController,
    StudentController,
    AccessController,
    RoleController,
    AuthController,
  ],
  providers: [
    UsersService,
    ArticleService,
    LessonService,
    StudentService,
    AccessService,
    RoleService,
    AuthService,
    ToolsService,
    LocalStrategy,
    JwtStrategy,
  ],
  exports: [ArticleService],
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(`${Config.adminPath}/*`);
  }
}
