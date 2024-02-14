import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Config } from 'src/config/config';
import { AccessService } from './access.service';
import { CreateAccessDto } from './dto/access.dto';

@Controller(`${Config.adminPath}/access`)
@ApiTags('权限')
export class AccessController {
  constructor(private readonly accessService: AccessService) {}

  @Post('findAll')
  @ApiOperation({ summary: '权限列表' })
  async findAll() {
    const result = await this.accessService.findAll();
    return { code: 200, data: { list: result } };
  }

  @Post('create')
  @ApiOperation({ summary: '创建权限' })
  async create(@Body() body: CreateAccessDto) {
    await this.accessService.create(body);
    return { code: 200, data: {} };
  }
}
