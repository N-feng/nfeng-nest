import { Article } from './article.model';
import { Column, HasMany, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'article_cate' })
export class ArticleCate extends Model {
  @Column({ primaryKey: true })
  id: number;

  @Column
  title: string;

  @Column
  state: number;

  @HasMany(() => Article)
  article: Article[];
}

export default ArticleCate;
