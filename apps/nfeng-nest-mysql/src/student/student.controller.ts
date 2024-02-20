import { Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Config } from 'src/config/config';
import { StudentService } from './student.service';

@Controller(`${Config.adminPath}/student`)
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('findAll')
  @ApiOperation({ summary: '学生列表' })
  async findAll() {
    const result = await this.studentService.findAll();
    return { code: 200, data: { list: result } };
  }
}
