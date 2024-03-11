import { Access } from '@app/db/models/access.model';
import { RoleAccess } from '@app/db/models/role_access.model';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Config } from '../config/config';
import { ToolsService } from '../../../../libs/tools/tools.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly toolService: ToolsService,
    @InjectModel(RoleAccess)
    private roleAccessModel: typeof RoleAccess,
    @InjectModel(Access)
    private accessModel: typeof Access,
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

  async checkAuth(request) {
    /*
      1、获取当前用户的角色和isSuper  如果isSuper==1或者当前访问地址在忽略的权限列表中的话允许访问
      2、根据角色获取当前角色的权限列表                       
      3、获取当前访问的url 对应的权限id
      4、判断当前访问的url对应的权限id 是否在权限列表中的id中
    */

    // 1、获取当前用户的角色和isSuper
    const roles = request.user.roles;
    const isSuper = request.user.isSuper;
    const adminPath = Config.adminPath;
    const pathname = request.url; // 当前访问的地址

    // 忽略权限判断的地址
    if (Config.ignoreUrl.indexOf(pathname) != -1 || isSuper == 1) {
      return true;
    }

    // 2、根据角色获取当前角色的权限列表
    const roleAccessArr = [];
    const roleAuthResult = await this.roleAccessModel.findAll({
      where: {
        roleId: roles.map((role) => role.id),
      },
    });
    for (let i = 0; i < roleAuthResult.length; i++) {
      roleAccessArr.push(roleAuthResult[i].accessId);
    }

    // 3、获取当前访问的url 对应的权限id
    const accessUrl = request.url.replace(`/${adminPath}/`, '');
    const accessUrlResult = await this.accessModel.findAll({
      where: {
        url: accessUrl,
      },
    });
    // 4、判断当前访问的url对应的权限id 是否在权限列表中的id中
    if (accessUrlResult.length > 0) {
      if (roleAccessArr.indexOf(accessUrlResult[0].id) != -1) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  // JWT验证 - Step 2: 校验用户信息
  async validateUser(data: any, req): Promise<any> {
    const { username, password, code } = data;

    console.log('req.session: ', req.session);
    if (
      code.toLocaleLowerCase() !== req.session?.captcha?.toLocaleLowerCase()
    ) {
      return {
        code: 3,
        user: null,
      };
    }

    console.log('JWT验证 - Step 2: 校验用户信息');
    const user = await this.userService.findOne(username);
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
    // 1、获取当前用户的角色和isSuper
    const roles = user.roles;

    // 2、根据角色获取当前角色的权限列表
    const roleAccessArr = [];
    const roleAuthResult = await this.roleAccessModel.findAll({
      where: {
        roleId: roles.map((role) => role.id),
      },
    });
    for (let i = 0; i < roleAuthResult.length; i++) {
      roleAccessArr.push(roleAuthResult[i].accessId);
    }

    // console.log('roleAccessArr: ', roleAccessArr);
    // 3、根据权限ID列表获取菜单
    const access = await this.accessModel.findAll({
      where: {
        id: roleAccessArr,
        moduleId: 0,
      },
      // include: [Access],
      include: [
        {
          model: Access,
          where: {
            id: roleAccessArr,
          },
        },
      ],
    });

    const payload = {
      username: user.username,
      sub: user.id,
      roles: user.roles,
      roleIds: user.roles.map((role) => role.id),
      isSuper: user.isSuper,
      access: access,
      accessIds: roleAccessArr,
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
