import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class CreateRoleAccessDto {
  @ApiPropertyOptional({ description: '角色ID' })
  @IsString()
  roleId: string;

  @ApiPropertyOptional({ description: '授权节点' })
  @IsArray()
  accessIds: number[];
}
