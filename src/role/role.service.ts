import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Role from 'src/model/role.model';
import RoleAccess from 'src/model/role_access.model';
import Access from 'src/model/access.model';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role)
    private roleModel: typeof Role,
    @InjectModel(RoleAccess)
    private roleAccessModel: typeof RoleAccess,
  ) {}

  async findAll() {
    return await this.roleModel.findAll({
      include: [Access],
    });
  }

  async findOne(id) {
    const u = await this.roleModel.findOne({
      where: { id },
      include: [Access],
    });
    if (!u) {
      throw new BadRequestException({ code: 400, msg: '找不到用户' });
    }
    return u;
  }

  async update(id, user) {
    return await this.roleModel.update(id, user);
  }

  async delete(id) {
    return await this.roleModel.destroy(id);
  }

  async create(user) {
    const { title } = user;
    const u = await this.roleModel.findOne({ where: { title } });

    if (u) {
      throw new BadRequestException({ code: 400, msg: '用户已经注册' });
    }
    return await this.roleModel.create(user);
  }

  async deleteRoleAccess(body) {
    return await this.roleAccessModel.destroy(body);
  }

  async createRoleAccess(body) {
    return await this.roleAccessModel.create(body);
  }
}
