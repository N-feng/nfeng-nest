import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/users.dto';
import { Response } from 'express';
import { ToolsService } from '../tools/tools.service';
import { Config } from '../config/config';

@Controller(`${Config.adminPath}/users`)
@ApiTags('用户')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly toolsService: ToolsService,
  ) {}

  @Post('findAll')
  @ApiOperation({ summary: '用户列表' })
  async findAll(@Res() res: Response) {
    const result = await this.usersService.findAll();
    // return { code: 200, data: { list: result } };
    res.status(HttpStatus.OK).json({ code: 200, data: { list: result } });
  }

  @Get('findOne/:id')
  @ApiOperation({ summary: '查询用户' })
  async findOne(@Query('username') username: string = 'nfeng') {
    const { age, email, mobile, password, sex, id } =
      await this.usersService.findOne(username);
    const access = await this.usersService.getAccessById(id);
    return {
      code: 200,
      data: { age, email, mobile, password, sex, username, access },
    };
  }

  @Put('update/:id')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiOperation({ summary: '编辑用户' })
  async update(
    @Param('id') id: string,
    @Body() body: CreateUserDto,
    @Res() res: Response,
  ) {
    const password = this.toolsService.getMd5(body.password);
    await this.usersService.update(id, { ...body, password });
    res.status(HttpStatus.OK).send({ code: 200, data: {} });
  }

  @Delete('remove')
  @ApiOperation({ summary: '删除用户' })
  async remove(@Query('id') id: string) {
    await this.usersService.delete(id);
    return { code: 200, data: {} };
  }

  @Post('create')
  @ApiOperation({ summary: '创建用户' })
  async create(@Body() body: CreateUserDto) {
    const password = this.toolsService.getMd5(body.password);
    const newParam = { ...body, password, status: true };
    await this.usersService.create(newParam);
    return { code: 200, data: {} };
  }

  @Post('/many')
  @ApiOperation({ summary: '批量创建用户' })
  async createMany(@Body() users) {
    const newUsers = users.map((user) => ({ ...user, status: true }));
    await this.usersService.createMany(newUsers);
    return { code: 200, data: {} };
  }
}
