import { Injectable } from '@nestjs/common';
import { Article } from '../../libs/db/src/models/article.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article)
    private articleModel: typeof Article,
  ) {}

  async findAll() {
    return await this.articleModel.findAll({
      // relations: ['cate']
    });
  }
}
