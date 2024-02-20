import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ToolsService } from '../tools/tools.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ToolsService],
})
export class UsersModule {}
