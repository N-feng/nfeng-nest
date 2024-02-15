import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from '../model/user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserRole } from 'src/model/user_role.model';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    SequelizeModule.forFeature([UserRole]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
