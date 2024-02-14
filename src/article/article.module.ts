import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { Article } from '../model/article.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Article])],
  providers: [ArticleService],
  controllers: [ArticleController],
})
export class ArticleModule {}
