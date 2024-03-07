import { Photo } from '@app/db/models/photo.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class PhotoService {
  constructor(
    @InjectModel(Photo)
    private photoModel: typeof Photo,
  ) {}

  async findAll(body) {
    const { current = 1, filter, pageSize = 9999, sorter, ...params } = body;
    console.log('filter: ', filter);
    console.log('sorter: ', sorter);
    const list = await this.photoModel.findAll({
      limit: pageSize,
      offset: (current - 1) * pageSize,
      where: {
        // moduleId: 0,
        ...params,
      },
      // include: [Access],
    });
    const total = await this.photoModel.count({
      where: {
        ...params,
      },
    });
    return { list, total };
  }

  async create(body) {
    return await this.photoModel.create(body);
  }

  async update(id, body) {
    return await this.photoModel.update(body, { where: { id } });
  }

  async delete(id) {
    return await this.photoModel.destroy({ where: { id } });
  }
}
