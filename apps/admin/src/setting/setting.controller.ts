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
import { SettingService } from './setting.service';
import { ToolsService } from '../../../../libs/tools/tools.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Config } from '../config/config';

@Controller(`${Config.adminPath}/setting`)
@ApiTags('系统')
export class SettingController {
  constructor(
    private readonly settingService: SettingService,
    private readonly toolsService: ToolsService,
  ) {}

  @Post('findAll')
  @ApiOperation({ summary: '系统列表' })
  async findAll(@Body() body) {
    const { list, total } = await this.settingService.findAll(body);
    return { code: 200, data: { list }, success: true, total };
  }

  @Get('findOne')
  @ApiOperation({ summary: '查询系统' })
  async findOne(@Query('id') id: number) {
    const product = await this.settingService.findOne(id);
    return {
      code: 200,
      data: { product },
    };
  }

  @Post('create')
  @ApiOperation({ summary: '创建系统' })
  async create(@Body() body) {
    const data = await this.settingService.create(body);
    return { code: 200, data };
  }

  @Put('update')
  @ApiOperation({ summary: '更新系统' })
  async update(@Query('id') id: string, @Body() body) {
    await this.settingService.update(id, body);
    return { code: 200, data: {} };
  }

  @Delete('remove')
  @ApiOperation({ summary: '删除系统' })
  async remove(@Query('id') id: any) {
    await this.settingService.delete(id);
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

  @Get('flavorList')
  @ApiOperation({ summary: '获取口味信息' })
  async flavorList() {
    const result = await this.settingService.findAll();
    //少辣，不要葱，打包带走   ["少辣","不要葱"]
    const list = result[0].orderLabel.replace('，', ',').split(',');
    return { success: true, result: list };
  }
}
