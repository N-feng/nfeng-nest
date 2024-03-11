import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Config } from '../config/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { ToolsService } from '../../../../libs/tools/tools.service';
// import { createReadStream } from 'fs';

@Controller(`${Config.adminPath}/product`)
@ApiTags('菜品')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly toolsService: ToolsService,
  ) {}

  @Post('findAll')
  @ApiOperation({ summary: '菜品列表' })
  async findAll(@Body() body) {
    const { list, total } = await this.productService.findAll(body);
    return { code: 200, data: { list }, success: true, total };
  }

  @Get('findOne')
  @ApiOperation({ summary: '查询菜品' })
  async findOne(@Query('id') id: number) {
    const product = await this.productService.findOne(id);
    return {
      code: 200,
      data: { product },
    };
  }

  @Post('create')
  @ApiOperation({ summary: '创建菜品' })
  async create(@Body() body) {
    const data = await this.productService.create(body);
    return { code: 200, data };
  }

  @Put('update')
  @ApiOperation({ summary: '更新菜品' })
  async update(@Query('id') id: string, @Body() body) {
    await this.productService.update(id, body);
    return { code: 200, data: {} };
  }

  @Delete('remove')
  @ApiOperation({ summary: '删除菜品' })
  async remove(@Query('id') id: any) {
    await this.productService.delete(id);
    return { code: 200, data: {} };
  }

  @Post('upload')
  @ApiOperation({ summary: '图片上传' })
  @UseInterceptors(FileInterceptor('file'))
  async upload(@Body() body, @UploadedFile() file) {
    // console.log('file: ', file);
    if (file) {
      // const source = createReadStream(file.filepath);
      const source = file.buffer;
      const filename = this.toolsService.getCosUploadFile(file.originalname);

      //异步 改成 同步
      await this.toolsService.uploadCos(filename, source);

      return {
        code: 200,
        msg: '上传成功',
        link: process.env.cosUrl + '/' + filename,
      };
    }

    return {
      code: 200,
      msg: '上传失败',
    };
  }
}
