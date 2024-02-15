import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '../model/user.model';
// import { Sequelize } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';
import UserRole from 'src/model/user_role.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private usersModel: typeof User,
    @InjectModel(UserRole)
    private userRoleModel: typeof UserRole,
    // private sequelize: Sequelize,
  ) {}

  async findAll() {
    return await this.usersModel.findAll({
      include: ['photos'],
    });
  }

  async findOne(username) {
    const u = await this.usersModel.findOne({ where: { username } });
    if (!u) {
      throw new BadRequestException({ code: 400, msg: '找不到用户' });
    }
    return u;
  }

  async update(id, user) {
    // 1. 删除用户角色
    await this.userRoleModel.destroy({ where: { userId: id } });

    // 2. 添加用户角色
    for (let i = 0; i < user.roleIds.length; i++) {
      await this.userRoleModel.create({
        userId: id,
        roleId: user.roleIds[i],
      });
    }

    return await this.usersModel.update(
      {
        ...user,
        password: user.password,
      },
      { where: { id } },
    );
  }

  async delete(id) {
    return await this.usersModel.destroy(id);
  }

  async create(user) {
    const { username } = user;
    const u = await this.usersModel.findOne({ where: { username } });

    if (u) {
      throw new BadRequestException({ code: 400, msg: '用户已经注册' });
    }
    return await this.usersModel.create({
      ...user,
      password: user.password,
    });
  }

  async createMany(users) {
    console.log('users: ', users);
    // const queryRunner = this.dataSource.createQueryRunner();

    // await queryRunner.connect();
    // await queryRunner.startTransaction();
    // try {
    //   users.forEach(async (user) => {
    //     await queryRunner.manager.getRepository(User).save(user);
    //   });

    //   await queryRunner.commitTransaction();
    // } catch (err) {
    //   //如果遇到错误，可以回滚事务
    //   await queryRunner.rollbackTransaction();
    // } finally {
    //   //你需要手动实例化并部署一个queryRunner
    //   await queryRunner.release();
    // }
  }
}
