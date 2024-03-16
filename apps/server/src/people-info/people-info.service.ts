import { PeopleInfoModel } from '@app/db/models/peopleInfo.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class PeopleInfoService {
  constructor(
    @InjectModel(PeopleInfoModel)
    private peopleInfoModel: typeof PeopleInfoModel,
  ) {}

  async findAll(body, tableId) {
    const { current = 1, filter, pageSize = 9999, sorter, ...params } = body;
    console.log('filter: ', filter);
    console.log('sorter: ', sorter);
    const list = await this.peopleInfoModel.findAll({
      limit: pageSize,
      offset: (current - 1) * pageSize,
      where: {
        tableId: tableId,
      },
    });
    const total = await this.peopleInfoModel.count({
      where: {
        ...params,
      },
    });
    return { list, total };
  }

  // async findOne(id) {
  //   return await this.peopleInfoModel.findOne({
  //     where: { id },
  //     include: [PhotoModel],
  //   });
  // }

  /*
    增加购物车接口  
      1、判断购物车是否有当前桌号对应的菜品数据
      2、没有的话执行增加
      3、有的话执行修改  让数量加1  
    */
  async create(body) {
    const tableId = body.tableId;
    const cartResult: any = await this.peopleInfoModel.findAll({
      where: {
        tableId: tableId,
      },
    });
    if (cartResult.length > 0) {
      this.peopleInfoModel.update(body, {
        where: {
          tableId: tableId,
        },
      });
    } else {
      await this.peopleInfoModel.create(body);
    }
    return { success: true, msg: '更新成功' };
  }

  // async update(id, body) {
  //   return await this.peopleInfoModel.update(body, { where: { id } });
  // }

  async delete(tableId) {
    return await this.peopleInfoModel.destroy({
      where: {
        tableId: tableId,
      },
    });
  }
}
