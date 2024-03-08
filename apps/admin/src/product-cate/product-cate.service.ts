import { ProductCate } from '@app/db/models/product_cate.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ProductCateService {
  constructor(
    @InjectModel(ProductCate)
    private productCateModel: typeof ProductCate,
  ) {}

  async findAll(body) {
    const { current = 1, filter, pageSize = 9999, sorter, ...params } = body;
    console.log('filter: ', filter);
    console.log('sorter: ', sorter);
    const list = await this.productCateModel.findAll({
      limit: pageSize,
      offset: (current - 1) * pageSize,
      where: {
        // moduleId: 0,
        ...params,
      },
      // include: [Access],
    });
    const total = await this.productCateModel.count({
      where: {
        ...params,
      },
    });
    return { list, total };
  }

  async options() {
    return await this.productCateModel.findAll({});
  }

  async create(body) {
    return await this.productCateModel.create(body);
  }

  async update(id, body) {
    return await this.productCateModel.update(body, { where: { id } });
  }

  async delete(id) {
    // await this.roleproductCateModel.destroy({ where: { accessId: id } });
    return await this.productCateModel.destroy({ where: { id } });
  }
}
