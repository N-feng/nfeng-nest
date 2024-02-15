import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ArticleModule } from './article/article.module';
import { LessonModule } from './lesson/lesson.module';
import { StudentModule } from './student/student.module';
import { AccessModule } from './access/access.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      useFactory: () => ({
        dialect: 'mysql',
        host: process.env.DB_HOST,
        port: 3306,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: 'beego',
        models: [__dirname + '/**/*.model{.ts,.js}'],
        synchronize: true,
      }),
    }),
    UsersModule,
    ArticleModule,
    LessonModule,
    StudentModule,
    AccessModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
