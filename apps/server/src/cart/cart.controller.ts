import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Config } from '../config/config';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/cart.dto';

@Controller(`${Config.adminPath}/cart`)
@ApiTags('购物车')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('findAll')
  @ApiOperation({ summary: '购物车列表' })
  async findAll(@Body() body, @Query('tableId') tableId: number) {
    const { list, total } = await this.cartService.findAll(body, tableId);
    return { code: 200, data: { list }, success: true, total };
  }

  @Get('findOne')
  @ApiOperation({ summary: '查询购物车' })
  async findOne(@Query('id') id: number) {
    const product = await this.cartService.findOne(id);
    return {
      code: 200,
      data: { product },
    };
  }

  @Post('create')
  @ApiOperation({ summary: '创建购物车' })
  async create(@Body() body: CreateCartDto) {
    const data = await this.cartService.create(body);
    return { code: 200, data };
  }

  @Put('update')
  @ApiOperation({ summary: '更新购物车' })
  async update(@Query('id') id: string, @Body() body) {
    await this.cartService.update(id, body);
    return { code: 200, data: {} };
  }

  @Delete('remove')
  @ApiOperation({ summary: '删除购物车' })
  async remove(@Query('id') id: any) {
    await this.cartService.delete(id);
    return { code: 200, data: {} };
  }
}
