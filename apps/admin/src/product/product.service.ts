import { Photo } from '@app/db/models/photo.model';
import { Product } from '@app/db/models/product.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
    @InjectModel(Photo)
    private photoModel: typeof Photo,
  ) {}

  async findAll(body) {
    const { current = 1, filter, pageSize = 9999, sorter, ...params } = body;
    console.log('filter: ', filter);
    console.log('sorter: ', sorter);
    const list = await this.productModel.findAll({
      limit: pageSize,
      offset: (current - 1) * pageSize,
      where: {
        // moduleId: 0,
        ...params,
      },
      include: [Photo],
    });
    const total = await this.productModel.count({
      where: {
        ...params,
      },
    });
    return { list, total };
  }

  async findOne(id) {
    return await this.productModel.findOne({
      where: { id },
      include: [Photo],
    });
  }

  async create(body) {
    const { img_url, ...product } = body;
    const data = await this.productModel.create(product);
    for (let i = 0; i < img_url.length; i++) {
      const { name, status, percent, response } = img_url[i];
      await this.photoModel.create({
        name,
        status,
        percent,
        url: response.link,
        productId: data.id,
      });
    }
    return { data: data.id };
  }

  async update(id, body) {
    return await this.productModel.update(body, { where: { id } });
  }

  async delete(id) {
    return await this.productModel.destroy({ where: { id } });
  }
}
