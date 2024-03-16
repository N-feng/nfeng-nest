import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'people_info', timestamps: false })
export class PeopleInfoModel extends Model<PeopleInfoModel> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  public tableId: number;

  @Column
  public pNum: number;

  @Column
  public pMark: number;
}
