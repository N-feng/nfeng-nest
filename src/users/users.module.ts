import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../model/user.model';
import { UserRole } from 'src/model/user_role.model';
import { Role } from 'src/model/role.model';
import { RoleAccess } from 'src/model/role_access.model';
import { Access } from 'src/model/access.model';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    SequelizeModule.forFeature([UserRole]),
    SequelizeModule.forFeature([Role]),
    SequelizeModule.forFeature([RoleAccess]),
    SequelizeModule.forFeature([Access]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
