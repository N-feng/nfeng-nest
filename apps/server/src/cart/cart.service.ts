import { CartModel } from '@app/db/models/cart.model';
import { PhotoModel } from '@app/db/models/photo.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(CartModel)
    private cartModel: typeof CartModel,
  ) {}

  async findAll(body, tableId) {
    const { current = 1, filter, pageSize = 9999, sorter, ...params } = body;
    console.log('filter: ', filter);
    console.log('sorter: ', sorter);
    const list = await this.cartModel.findAll({
      limit: pageSize,
      offset: (current - 1) * pageSize,
      where: {
        table_id: tableId,
      },
    });
    const total = await this.cartModel.count({
      where: {
        ...params,
      },
    });
    return { list, total };
  }

  async findOne(id) {
    return await this.cartModel.findOne({
      where: { id },
      include: [PhotoModel],
    });
  }

  /*
    增加购物车接口  
      1、判断购物车是否有当前桌号对应的菜品数据
      2、没有的话执行增加
      3、有的话执行修改  让数量加1  
    */
  async create(body) {
    const tableId = body.tableId;
    const productId = body.productId;
    const cartResult: any = await this.cartModel.findAll({
      where: {
        tableId: tableId,
        productId: productId,
      },
    });
    if (cartResult.length > 0) {
      this.cartModel.update(
        {
          productNum: cartResult[0].productNum + 1,
        },
        {
          where: {
            tableId: tableId,
            productId: productId,
          },
        },
      );
    } else {
      await this.cartModel.create({
        ...body,
      });
    }
    return await this.cartModel.create(body);
  }

  async update(id, body) {
    return await this.cartModel.update(body, { where: { id } });
  }

  async delete(id) {
    return await this.cartModel.destroy({ where: { id } });
  }
}
