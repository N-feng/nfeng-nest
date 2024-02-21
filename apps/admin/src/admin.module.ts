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
import { LocalStrategy } from './auth/local.strategy';
import { JwtStrategy } from './auth/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './common/guard/auth.guard';
import { RolesGuard } from './common/guard/roles.guard';

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
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [ArticleService],
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    console.log('consumer: ', consumer);
  }
}
