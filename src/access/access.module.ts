import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Access } from '../model/access.model';
import { AccessService } from './access.service';
import { AccessController } from './access.controller';

@Module({
  imports: [SequelizeModule.forFeature([Access])],
  providers: [AccessService],
  controllers: [AccessController],
})
export class AccessModule {}
