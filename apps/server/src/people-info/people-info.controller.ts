import { Body, Controller, Delete, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PeopleInfoService } from './people-info.service';
import { Config } from '../config/config';
import { CreatePeopleInfoDto } from './dto/prople-info.dto';

@Controller(`${Config.adminPath}/people-info`)
@ApiTags('用户用餐信息')
export class PeopleInfoController {
  constructor(private readonly peopleInfoService: PeopleInfoService) {}

  @Post('findAll')
  @ApiOperation({ summary: '用户用餐信息列表' })
  async findAll(@Body() body, @Query('tableId') tableId: number) {
    const { list, total } = await this.peopleInfoService.findAll(body, tableId);
    return { code: 200, data: { list }, success: true, total };
  }

  // @Get('findOne')
  // @ApiOperation({ summary: '查询用户用餐信息' })
  // async findOne(@Query('id') id: number) {
  //   const product = await this.peopleInfoService.findOne(id);
  //   return {
  //     code: 200,
  //     data: { product },
  //   };
  // }

  @Post('create')
  @ApiOperation({ summary: '创建用户用餐信息' })
  async create(@Body() body: CreatePeopleInfoDto) {
    const data = await this.peopleInfoService.create(body);
    return { code: 200, data };
  }

  // @Put('update')
  // @ApiOperation({ summary: '更新用户用餐信息' })
  // async update(@Query('id') id: string, @Body() body) {
  //   await this.peopleInfoService.update(id, body);
  //   return { code: 200, data: {} };
  // }

  @Delete('remove')
  @ApiOperation({ summary: '删除用户用餐信息' })
  async remove(@Query('tableId') tableId: number) {
    await this.peopleInfoService.delete(tableId);
    return { code: 200, data: {} };
  }
}
