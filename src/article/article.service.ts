import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ArticleEntity } from '../entity/article.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}

  async findAll() {
    return await this.articleRepository.find({ relations: ['cate'] });
  }
}
