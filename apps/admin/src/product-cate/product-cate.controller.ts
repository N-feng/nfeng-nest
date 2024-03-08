import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Config } from '../config/config';
import { ProductCateService } from './product-cate.service';

@Controller(`${Config.adminPath}/productCate`)
@ApiTags('菜品分类')
@Controller('product-cate')
export class ProductCateController {
  constructor(private readonly productCateService: ProductCateService) {}

  @Post('findAll')
  @ApiOperation({ summary: '菜品分类列表' })
  async findAll(@Body() body) {
    const { list, total } = await this.productCateService.findAll(body);
    return { code: 200, data: { list }, success: true, total };
  }

  @Get('options')
  @ApiOperation({ summary: '菜品分类枚举' })
  async options() {
    const list = await this.productCateService.options();
    return { code: 200, data: { list } };
  }

  @Post('create')
  @ApiOperation({ summary: '创建菜品分类' })
  async create(@Body() body) {
    await this.productCateService.create(body);
    return { code: 200, data: {} };
  }

  @Put('update?id=:id')
  @ApiOperation({ summary: '更新菜品分类' })
  async update(@Param('id') id: string, @Body() body) {
    await this.productCateService.update(id, body);
    return { code: 200, data: {} };
  }

  @Delete('remove')
  @ApiOperation({ summary: '删除菜品分类' })
  async remove(@Query('id') id: any) {
    await this.productCateService.delete(id);
    return { code: 200, data: {} };
  }
}
