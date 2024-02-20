import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Config } from '../config/config';
import { AuthService } from './auth.service';
import { ToolsService } from '../tools/tools.service';
import { LoginDto } from './dto/login.dto';
import { CreateRoleAccessDto } from './dto/role_access.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller(`${Config.adminPath}auth`)
@ApiTags('账户')
export class AuthController {
  constructor(
    private authService: AuthService,
    private toolsService: ToolsService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ summary: '登录' })
  async login(@Body() body: LoginDto) {
    console.log('JWT验证 - Step 1: 用户请求登录');
    const authResult = await this.authService.validateUser(
      body.username,
      body.password,
    );
    switch (authResult.code) {
      case 1:
        return this.authService.certificate(authResult.user);
      case 2:
        return {
          code: 600,
          msg: `账号或密码不正确`,
        };
      default:
        return {
          code: 600,
          msg: `查无此人`,
        };
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  @ApiOperation({ summary: '获取个人信息' })
  @ApiBearerAuth()
  async getProfile(@Req() req) {
    return req.user;
  }

  @Post('doAuth')
  @ApiOperation({ summary: '更新账户权限' })
  async doAuth(@Body() body: CreateRoleAccessDto) {
    return body;
  }
}
