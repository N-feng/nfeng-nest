import { PhotoModel } from '@app/db/models/photo.model';
import { SettingModel } from '@app/db/models/setting.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class SettingService {
  constructor(
    @InjectModel(SettingModel)
    private settingModel: typeof SettingModel,
    @InjectModel(PhotoModel)
    private photoModel: typeof PhotoModel,
  ) {}

  async findAll(body) {
    const { current = 1, filter, pageSize = 9999, sorter, ...params } = body;
    console.log('filter: ', filter);
    console.log('sorter: ', sorter);
    const list = await this.settingModel.findAll({
      limit: pageSize,
      offset: (current - 1) * pageSize,
      where: {
        // moduleId: 0,
        ...params,
      },
      include: [PhotoModel],
    });
    const total = await this.settingModel.count({
      where: {
        ...params,
      },
    });
    return { list, total };
  }

  async findOne(id) {
    return await this.settingModel.findOne({
      where: { id },
      include: [PhotoModel],
    });
  }

  async create(body) {
    return await this.settingModel.create(body);
  }

  async update(id, body) {
    const { img_url, ...product } = body;
    await this.settingModel.update(product, { where: { id } });
    // 1、删除当前菜品下面的所有图片
    await this.photoModel.destroy({
      where: {
        productId: id,
      },
    });

    // 2、把当前菜品对应的所有图片增加到photo表里面
    for (let i = 0; i < img_url.length; i++) {
      const { name, status, percent, url } = img_url[i];
      console.log('url: ', url);
      await this.photoModel.create({
        name,
        status,
        percent,
        url,
        productId: id,
      });
    }
    return { data: id };
  }

  async delete(id) {
    return await this.settingModel.destroy({ where: { id } });
  }
}
