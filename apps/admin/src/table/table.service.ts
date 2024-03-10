import { TableModel } from '@app/db/models/table.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class TableService {
  constructor(
    @InjectModel(TableModel)
    private tableModel: typeof TableModel,
  ) {}

  async findAll(body) {
    const { current = 1, filter, pageSize = 9999, sorter, ...params } = body;
    console.log('filter: ', filter);
    console.log('sorter: ', sorter);
    const list = await this.tableModel.findAll({
      limit: pageSize,
      offset: (current - 1) * pageSize,
      where: {
        // moduleId: 0,
        ...params,
      },
      // include: [Access],
    });
    const total = await this.tableModel.count({
      where: {
        ...params,
      },
    });
    return { list, total };
  }

  async options() {
    return await this.tableModel.findAll({});
  }

  async findOne(id) {
    return await this.tableModel.findByPk(id);
  }

  async create(body) {
    return await this.tableModel.create(body);
  }

  async update(id, body) {
    return await this.tableModel.update(body, { where: { id } });
  }

  async delete(id) {
    // await this.roletableModel.destroy({ where: { accessId: id } });
    return await this.tableModel.destroy({ where: { id } });
  }
}
