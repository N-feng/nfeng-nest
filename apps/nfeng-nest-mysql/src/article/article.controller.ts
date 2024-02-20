import { Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Config } from './../config/config';
import { ArticleService } from './article.service';

@Controller(`${Config.adminPath}/article`)
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('findAll')
  @ApiOperation({ summary: '文章列表' })
  async findAll() {
    const result = await this.articleService.findAll();
    return { code: 200, data: { list: result } };
  }
}
