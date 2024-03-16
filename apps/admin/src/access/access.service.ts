import { Access } from '@app/db/models/access.model';
import { RoleAccess } from '@app/db/models/roleAccess.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AccessService {
  constructor(
    @InjectModel(Access)
    private accessModel: typeof Access,
    @InjectModel(RoleAccess)
    private roleAccessModel: typeof RoleAccess,
  ) {}

  async findAll(body) {
    const { current = 1, filter, pageSize = 9999, sorter, ...params } = body;
    console.log('filter: ', filter);
    console.log('sorter: ', sorter);
    const list = await this.accessModel.findAll({
      limit: pageSize,
      offset: (current - 1) * pageSize,
      where: {
        // moduleId: 0,
        ...params,
      },
      include: [Access],
    });
    const total = await this.accessModel.count({
      where: {
        ...params,
      },
    });
    return { list, total };
  }

  async create(body) {
    return await this.accessModel.create(body);
  }

  async update(id, body) {
    return await this.accessModel.update(body, { where: { id } });
  }

  async delete(id) {
    // await this.roleAccessModel.destroy({ where: { accessId: id } });
    return await this.accessModel.destroy({ where: { id } });
  }
}
