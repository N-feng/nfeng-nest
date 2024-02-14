import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { ArticleCate } from './article_cate.model';

@Table({ tableName: 'article', timestamps: false })
export class Article extends Model {
  @PrimaryKey
  @Column
  id: number;

  @Column
  title: string;

  @Column
  description: string;

  @Column
  state: string;

  @Column({ defaultValue: true })
  isActive: boolean;

  @ForeignKey(() => ArticleCate)
  @Column
  cateId: number;

  @BelongsTo(() => ArticleCate)
  cate: ArticleCate;
}

export default Article;
