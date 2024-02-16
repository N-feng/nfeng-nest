import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Config } from 'src/config/config';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/users.dto';
import { Response } from 'express';

@Controller(`${Config.adminPath}/users`)
@ApiTags('用户')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('findAll')
  @ApiOperation({ summary: '用户列表' })
  async findAll(@Res() res: Response) {
    const result = await this.usersService.findAll();
    // return { code: 200, data: { list: result } };
    res.status(HttpStatus.OK).json({ code: 200, data: { list: result } });
  }

  @Get('findOne')
  @ApiOperation({ summary: '查询用户' })
  async findOne(@Query('username') username: string) {
    const { age, email, mobile, password, sex, id } = await this.usersService.findOne(username);
    const access = await this.usersService.getAccessById(id);
    return { code: 200, data: { age, email, mobile, password, sex, username, access } };
  }

  @Put(':id')
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiOperation({ summary: '编辑用户' })
  async update(
    @Param('id') id: string,
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ) {
    await this.usersService.update(id, createUserDto);
    res.status(HttpStatus.OK).send({ code: 200, data: {} });
  }

  @Get('remove')
  @ApiOperation({ summary: '删除用户' })
  async remove(@Query('id') id: string) {
    await this.usersService.delete(id);
    return { code: 200, data: {} };
  }

  @Post('create')
  @ApiOperation({ summary: '创建用户' })
  async create(@Body() createUserDto: CreateUserDto) {
    const newParam = { ...createUserDto, status: true };
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
