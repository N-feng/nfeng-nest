import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ToolsService } from 'src/tools/tools.service';

@Module({
  providers: [AuthService, ToolsService],
  controllers: [AuthController],
})
export class AuthModule {}
