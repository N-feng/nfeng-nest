import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ToolsService } from 'libs/tools/tools.service';
import { CreateOrderDto } from './dto/order';
import { Config } from '../config/config';

@Controller(`${Config.adminPath}/order`)
@ApiTags('订单')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly toolsService: ToolsService,
  ) {}

  @Post('addOrder')
  @ApiOperation({ summary: '用户用餐信息列表' })
  async addOrder(@Body() body: CreateOrderDto) {
    const orderId = this.toolsService.getOrderId();
    await this.orderService.addOrder({ ...body, orderId });
    return {
      code: 200,
      success: true,
      msg: '增加订单成功',
    };
  }

  @Post('findAll')
  @ApiOperation({ summary: '订单列表' })
  async findAll(@Body() body: CreateOrderDto) {
    const { list, total } = await this.orderService.findAll(body);
    return { code: 200, data: list, success: true, total };
  }

  @Post('create')
  @ApiOperation({ summary: '创建订单' })
  async create(@Body() body: CreateOrderDto) {
    const orderId = this.toolsService.getOrderId();
    await this.orderService.create({ ...body, orderId });
    return { code: 200, data: {} };
  }

  @Put('update/:id')
  @ApiOperation({ summary: '更新订单' })
  async update(@Param('id') id: string, @Body() body: CreateOrderDto) {
    await this.orderService.update(id, body);
    return { code: 200, data: {} };
  }

  @Delete('remove')
  @ApiOperation({ summary: '删除订单' })
  async remove(@Query('id') id: any) {
    await this.orderService.delete(id);
    return { code: 200, data: {} };
  }
}
