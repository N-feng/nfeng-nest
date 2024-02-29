import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CommonModule } from '@app/common';
import { ArticleController } from './article/article.controller';
import { LessonController } from './lesson/lesson.controller';
import { StudentController } from './student/student.controller';
import { AccessController } from './access/access.controller';
import { RoleController } from './role/role.controller';
import { AuthController } from './auth/auth.controller';
import { ArticleService } from './article/article.service';
import { LessonService } from './lesson/lesson.service';
import { StudentService } from './student/student.service';
import { AccessService } from './access/access.service';
import { RoleService } from './role/role.service';
import { AuthService } from './auth/auth.service';
import { ToolsService } from './tools/tools.service';
import { LocalStrategy } from './auth/local.strategy';
import { JwtStrategy } from './auth/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './common/guard/auth.guard';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

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
  ],
  providers: [
    ArticleService,
    LessonService,
    StudentService,
    AccessService,
    RoleService,
    AuthService,
    ToolsService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    UserService,
  ],
  exports: [ArticleService],
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    console.log('consumer: ', consumer);
  }
}
