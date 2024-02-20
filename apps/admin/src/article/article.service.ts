import { Article } from '@app/db/models/article.model';
import { Injectable } from '@nestjs/common';
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
