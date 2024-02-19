import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ArticleModule } from './article/article.module';
import { LessonModule } from './lesson/lesson.module';
import { StudentModule } from './student/student.module';
import { AccessModule } from './access/access.module';
import { RoleModule } from './role/role.module';
import { ToolsService } from './tools/tools.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { CommonModule } from '@app/common';
import { Config } from './config/config';
import { AuthMiddleware } from './middleware/auth.middleware';

@Module({
  imports: [
    CommonModule,
    UsersModule,
    ArticleModule,
    LessonModule,
    StudentModule,
    AccessModule,
    RoleModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, ToolsService, AuthService],
  exports: [AuthService],
})
export class AppModule {}
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(AuthMiddleware).forRoutes(`${Config.adminPath}/*`);
//   }
// }
