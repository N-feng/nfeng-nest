import { OrderModel } from '@app/db/models/order.model';
import { OrderItemsModel } from '@app/db/models/orderItems.model';
import { ProductModel } from '@app/db/models/product.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(OrderModel)
    private orderModel: typeof OrderModel,
    @InjectModel(OrderItemsModel)
    private orderItemsModel: typeof OrderItemsModel,
    @InjectModel(ProductModel)
    private productModel: typeof ProductModel,
  ) {}

  /*
    增加订单接口：
        1、获取数据 并解析orderItem
        2、判断当前桌子下面是否有已下单并且未支付的订单，如果有的话更新订单，没有执行增加
        3、清空当前桌子对应的购物车数据
        4、打印小票
    */
  async addOrder(body) {
    const tableId = body.tableId;
    const pNum = body.pNum; //用餐人数
    const pMark = body.pMark; //备注口味信息
    // const orderItems = body.orderItems ? JSON.parse(body.orderItems) : []; //菜品信息
    const orderItems = body.orderItems ? body.orderItems : []; //菜品信息
    const orderId = body.orderId; ///  //生成orderId
    const totalPrice = body.totalPrice; //总价格
    const totalNum = body.totalNum; //总数量
    const payStatus = 0; //0表示未支付  1表示已经支付
    const orderStatus = 0; //0表示已 下单并且未支付        1 表示已支付 已完结     2表示取消

    const orderResult = await this.orderModel.findAll({
      where: {
        tableId: tableId,
        payStatus: 0,
        orderStatus: 0,
      },
    });
    if (orderResult.length > 0) {
      //合并订单
      await this.orderModel.update(
        {
          totalPrice: Number(totalPrice) + Number(orderResult[0].totalPrice),
          totalNum: Number(totalNum) + Number(orderResult[0].totalNum),
        },
        {
          where: {
            tableId: tableId,
            payStatus: 0,
            orderStatus: 0,
          },
        },
      );

      for (let i = 0; i < orderItems.length; i++) {
        await this.orderItemsModel.create({
          orderId: orderResult[0].id,
          tableId: tableId,
          productId: orderItems[i].productId,
          productImg: orderItems[i].productImg,
          productTitle: orderItems[i].productTitle,
          productPrice: orderItems[i].productPrice,
          productNum: orderItems[i].productNum,
          status: 1 /*状态是1  表示已经下厨     状态是2表示退菜*/,
        });
      }
    } else {
      //增加订单

      //1、增加order表的数据
      const orderCreateResult = await this.orderModel.create({
        tableId,
        pNum,
        pMark,
        orderId,
        totalPrice,
        totalNum,
        payStatus,
        orderStatus,
      });
      console.log(orderCreateResult);
      //2、增加order_item表的数据
      if (orderCreateResult) {
        for (let i = 0; i < orderItems.length; i++) {
          await this.orderItemsModel.create({
            orderId: orderCreateResult.id,
            tableId: tableId,
            productId: orderItems[i].productId,
            productImg: orderItems[i].productImg,
            productTitle: orderItems[i].productTitle,
            productPrice: orderItems[i].productPrice,
            productNum: orderItems[i].productNum,
            status: 1 /*状态是1  表示已经下厨     状态是2表示退菜*/,
          });
        }
      }
    }
  }

  async findAll(body) {
    const { current = 1, filter, pageSize = 9999, sorter, ...params } = body;
    console.log('filter: ', filter);
    console.log('sorter: ', sorter);
    const list = await this.orderModel.findAll({
      limit: pageSize,
      offset: (current - 1) * pageSize,
      where: {
        // moduleId: 0,
        ...params,
      },
      include: [OrderItemsModel],
    });
    const total = await this.orderModel.count({
      where: {
        ...params,
      },
    });
    return { list, total };
  }

  async create(body) {
    const tableId = body.tableId;
    const orderItems = await this.productModel.findAll({
      where: {
        id: body.orderItems,
      },
    });
    //1、增加order表的数据
    const orderCreateResult = await this.orderModel.create(body);
    for (let i = 0; i < orderItems.length; i++) {
      await this.orderItemsModel.create({
        orderId: orderCreateResult.id,
        tableId: tableId,
        // productId: orderItems[i].productId,
        // productImg: orderItems[i].productImg,
        // productTitle: orderItems[i].productTitle,
        // productPrice: orderItems[i].productPrice,
        // productNum: orderItems[i].productNum,
        productId: orderItems[i].id,
        productTitle: orderItems[i].title,
        productPrice: orderItems[i].price,
        status: 1 /*状态是1  表示已经下厨     状态是2表示退菜*/,
      });
    }
  }

  async update(id, body) {
    const tableId = id;
    const totalPrice = body.totalPrice; //总价格
    const totalNum = body.totalNum; //总数量
    const orderItems = await this.productModel.findAll({
      where: {
        id: body.orderItems,
      },
    });
    const orderResult = await this.orderModel.findAll({
      where: {
        tableId: tableId,
        payStatus: 0,
        orderStatus: 0,
      },
    });
    if (orderResult.length > 0) {
      //合并订单
      await this.orderModel.update(
        {
          totalPrice: Number(totalPrice) + Number(orderResult[0].totalPrice),
          totalNum: Number(totalNum) + Number(orderResult[0].totalNum),
          ...body,
        },
        {
          where: { id },
        },
      );
      for (let i = 0; i < orderItems.length; i++) {
        await this.orderItemsModel.create({
          orderId: id,
          tableId: tableId,
          // productId: orderItems[i].productId,
          // productImg: orderItems[i].productImg,
          // productTitle: orderItems[i].productTitle,
          // productPrice: orderItems[i].productPrice,
          // productNum: orderItems[i].productNum,
          productId: orderItems[i].id,
          productTitle: orderItems[i].title,
          productPrice: orderItems[i].price,
          status: 1 /*状态是1  表示已经下厨     状态是2表示退菜*/,
        });
      }
    }
  }

  async delete(id) {
    // await this.roleAccessModel.destroy({ where: { accessId: id } });
    return await this.orderModel.destroy({ where: { id } });
  }
}
