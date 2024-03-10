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
import { TableService } from './table.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Config } from '../config/config';
import { Public } from '../common/docotator/public.decorator';
import { ToolsService } from '../tools/tools.service';

@Controller(`${Config.adminPath}/table`)
@ApiTags('桌号')
@Controller('table')
export class TableController {
  constructor(
    private readonly tableService: TableService,
    private readonly toolsService: ToolsService,
  ) {}

  @Post('findAll')
  @ApiOperation({ summary: '桌号列表' })
  async findAll(@Body() body) {
    const { list, total } = await this.tableService.findAll(body);
    return { code: 200, data: { list }, success: true, total };
  }

  @Get('options')
  @ApiOperation({ summary: '桌号枚举' })
  async options() {
    const list = await this.tableService.options();
    return { code: 200, data: { list } };
  }

  @Post('create')
  @ApiOperation({ summary: '创建桌号' })
  async create(@Body() body) {
    await this.tableService.create(body);
    return { code: 200, data: {} };
  }

  @Put('update?id=:id')
  @ApiOperation({ summary: '更新桌号' })
  async update(@Param('id') id: string, @Body() body) {
    await this.tableService.update(id, body);
    return { code: 200, data: {} };
  }

  @Delete('remove')
  @ApiOperation({ summary: '删除桌号' })
  async remove(@Query('id') id: any) {
    await this.tableService.delete(id);
    return { code: 200, data: {} };
  }

  @Public()
  @Get('showCode')
  @ApiOperation({ summary: '显示二维码' })
  async getQrCode(@Query('id') id) {
    console.log('id: ', id);
    /*
        1、生成图形二维码   
        2、把二维码上传到对象存储   返回一个二维码的地址
        3、生成图片二维码 （合成图片）
        4、图片二维码上传到对象存储
        5、页面上输出图片
    */
    const table = await this.tableService.findOne(id);

    const qrUrl = `http://localhost:3001/${Config.adminPath}/table/showCode?id=${id}`;

    const qrImage = await this.toolsService.getQrImage(qrUrl);

    const filename = this.toolsService.getCosUploadFile(`code_${id}.png`);

    const qrImageObj: any = await this.toolsService.uploadCos(
      filename,
      qrImage,
    );
    console.log(qrImageObj.Location);

    // const canvasStream = await this.toolsService.getCanvasImage(
    //   table.title,
    //   // 'http://nfeng-1257981287.cos.ap-guangzhou.myqcloud.com/bg.png',
    //   'public/bg.png',
    //   'http://' + qrImageObj.Location,
    // );

    // const canvasImageObj: any = await this.toolsService.uploadCos(
    //   `code_image_${id}.png`,
    //   canvasStream,
    // );

    // res.send({
    //   imgUrl: 'http://' + canvasImageObj.Location,
    // });

    await this.tableService.update(id, {
      ...table,
      codeSrc: 'http://' + qrImageObj.Location,
    });

    return {
      code: 200,
      data: {
        text: table.title,
        bgSrc: '/static/bg.png',
        codeSrc: 'http://' + qrImageObj.Location,
      },
    };
  }
}
