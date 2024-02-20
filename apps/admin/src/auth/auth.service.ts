import { Access } from '@app/db/models/access.model';
import { RoleAccess } from '@app/db/models/role_access.model';
import { User } from '@app/db/models/user.model';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Config } from '../config/config';
import { UsersService } from '../users/users.service';
import { ToolsService } from '../tools/tools.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly toolService: ToolsService,
    @InjectModel(RoleAccess)
    private roleAccessModel: typeof RoleAccess,
    @InjectModel(Access)
    private accessModel: typeof Access,
    @InjectModel(User)
    private usersModel: typeof User,
  ) {}

  async doAuth(body) {
    const { accessIds, roleId } = body;

    // 1、删除当前角色下面的所有权限
    await this.roleAccessModel.destroy({
      where: {
        roleId: roleId,
      },
    });

    // 2、把当前角色对应的所有权限增加到role_access表里面
    for (let i = 0; i < accessIds.length; i++) {
      await this.roleAccessModel.create({
        roleId,
        accessId: accessIds[i],
      });
    }
  }

  async checkAuth(req) {
    /*
      1、获取当前用户的角色    （如果超级用户跳过权限判断 isSuper=1）
      2、根据角色获取当前角色的权限列表
      3、获取当前访问的url 对应的权限id
      4、判断当前访问的url对应的权限id 是否在权限列表中的id中
    */

    // 1、获取当前用户的角色
    const userInfo = req.session.userInfo;
    const roleId = userInfo.roleId;
    if (userInfo.isSuper == 1) {
      // 超级管理员
      return true;
    }

    // 2、根据角色获取当前角色的权限列表
    const roleAccessResult = await this.roleAccessModel.findAll({
      where: {
        roleId,
      },
    });
    const roleAccessArray = [];
    roleAccessResult.forEach((value) => {
      roleAccessArray.push(value.accessId.toString());
    });

    // 3、获取当前访问的url 对应的权限id
    const { baseUrl } = req;
    const pathname = baseUrl.replace(`/${Config.adminPath}/`, '');
    const accessResult = await this.accessModel.findAll({
      where: {
        url: pathname,
      },
    });

    if (accessResult.length > 0) {
      // 4、判断当前访问的url对应的权限id 是否在权限列表中的id中
      if (roleAccessArray.indexOf(accessResult[0].id.toString()) != -1) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  async login(user: any) {
    const userResult = await this.usersModel.findOne({ where: { ...user } });
    if (!userResult) {
      throw new BadRequestException({ code: 400, msg: '用户名或者密码不正确' });
    }
    const payload = {
      ...userResult,
      username: userResult.username,
      sub: userResult.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // JWT验证 - Step 2: 校验用户信息
  async validateUser(username: string, password: string): Promise<any> {
    console.log('JWT验证 - Step 2: 校验用户信息');
    const user = await this.usersService.findOne(username);
    if (user) {
      const hashedPassword = user.password;
      // 通过密码盐，加密传参，再与数据库里的比较，判断是否相等
      const hashPassword = this.toolService.getMd5(password);
      if (hashedPassword === hashPassword) {
        // 密码正确
        return {
          code: 1,
          user,
        };
      } else {
        // 密码错误
        return {
          code: 2,
          user: null,
        };
      }
    }
    // 查无此人
    return {
      code: 3,
      user: null,
    };
  }

  // JWT验证 - Step 3: 处理 jwt 签证
  async certificate(user: any) {
    const payload = {
      username: user.username,
      sub: user.id,
      roles: user.roles,
      roleIds: user.roles.map((role) => role.id),
    };
    console.log('JWT验证 - Step 3: 处理 jwt 签证');
    try {
      const token = this.jwtService.sign(payload);
      return {
        code: 200,
        data: {
          token,
        },
        msg: `登录成功`,
      };
    } catch (error) {
      return {
        code: 600,
        msg: `账号或密码错误`,
      };
    }
  }
}
