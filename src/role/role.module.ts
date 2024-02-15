import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { SequelizeModule } from '@nestjs/sequelize';
import Role from 'src/model/role.model';
import RoleAccess from 'src/model/role_access.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Role]),
    SequelizeModule.forFeature([RoleAccess]),
  ],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
