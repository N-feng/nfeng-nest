import { Access } from '@app/db/models/access.model';
import { Role } from '@app/db/models/role.model';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role)
    private roleModel: typeof Role,
  ) {}

  async findAll() {
    return await this.roleModel.findAll({
      // include: [Access],
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
}
