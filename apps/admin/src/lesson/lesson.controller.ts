import { Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { LessonService } from './lesson.service';
import { Config } from '../config/config';

@Controller(`${Config.adminPath}/lesson`)
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post('findAll')
  @ApiOperation({ summary: '课程列表' })
  async findAll() {
    const result = await this.lessonService.findAll();
    return { code: 200, data: { list: result } };
  }
}
