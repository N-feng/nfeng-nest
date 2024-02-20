import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateRoleAccessDto } from 'src/auth/dto/role_access.dto';
import { Config } from 'src/config/config';
import { LoginDto } from 'src/auth/dto/login.dto';
import { AuthService } from './auth.service';
import { ToolsService } from 'src/tools/tools.service';

@Controller(`${Config.adminPath}auth`)
@ApiTags('账户')
export class AuthController {
  constructor(
    private authService: AuthService,
    private toolsService: ToolsService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: '登录' })
  async login(@Body() body: LoginDto) {
    const password = this.toolsService.getMd5(body.password);
    return await this.authService.login({ ...body, password });
  }

  @Post('doAuth')
  @ApiOperation({ summary: '更新账户权限' })
  async doAuth(@Body() body: CreateRoleAccessDto) {
    return body;
  }
}
