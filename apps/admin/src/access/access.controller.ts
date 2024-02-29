import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AccessService } from './access.service';
import { CreateAccessDto } from './dto/access.dto';
import { Config } from '../config/config';

@Controller(`${Config.adminPath}/access`)
@ApiTags('权限')
@ApiBearerAuth()
export class AccessController {
  constructor(private readonly accessService: AccessService) {}

  @Post('findAll')
  @ApiOperation({ summary: '权限列表' })
  async findAll(@Body() body: CreateAccessDto) {
    const { list, total } = await this.accessService.findAll(body);
    return { code: 200, data: { list }, success: true, total };
  }

  @Post('create')
  @ApiOperation({ summary: '创建权限' })
  async create(@Body() body: CreateAccessDto) {
    await this.accessService.create(body);
    return { code: 200, data: {} };
  }

  @Put('update/:id')
  @ApiOperation({ summary: '更新权限' })
  async update(@Param('id') id: string, @Body() body: CreateAccessDto) {
    await this.accessService.update(id, body);
    return { code: 200, data: {} };
  }

  @Delete('remove')
  @ApiOperation({ summary: '删除权限' })
  async remove(@Query('id') id: any) {
    await this.accessService.delete(id);
    return { code: 200, data: {} };
  }
}
