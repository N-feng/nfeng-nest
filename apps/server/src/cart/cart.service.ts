import { CartModel } from '@app/db/models/cart.model';
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

  // async findOne(id) {
  //   return await this.cartModel.findOne({
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
          product_num: cartResult[0].product_num + 1,
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

  // async update(id, body) {
  //   return await this.cartModel.update(body, { where: { id } });
  // }

  async delete(body) {
    const tableId = body.tableId;
    const productId = body.productId;
    const cartResult: any = await this.cartModel.findAll({
      where: {
        table_id: tableId,
        product_id: productId,
      },
    });
    if (cartResult.length > 0) {
      if (cartResult[0].product_num > 1) {
        this.cartModel.update(
          {
            product_num: cartResult[0].product_num - 1,
          },
          {
            where: {
              tableId: tableId,
              productId: productId,
            },
          },
        );
      } else {
        this.cartModel.destroy({
          where: {
            table_id: tableId,
            product_id: productId,
          },
        });
      }
      return { success: true, msg: '更新成功' };
    }
    return { success: false, msg: '更新失败' };
  }

  async cartCount(tableId) {
    return await this.cartModel.sum('product_num', {
      where: { table_id: tableId },
    });
  }
}
