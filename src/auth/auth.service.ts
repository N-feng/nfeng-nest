import { Access } from '@app/db/models/access.model';
import { Photo } from '@app/db/models/photo.model';
import { Role } from '@app/db/models/role.model';
import { RoleAccess } from '@app/db/models/role_access.model';
import { User } from '@app/db/models/user.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Config } from 'src/config/config';

@Injectable()
export class AuthService {
  constructor(
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

  async findUser(user: any) {
    return await this.usersModel.findAll({
      include: [Photo, Role],
      where: {
        ...user,
      },
    });
  }
}
