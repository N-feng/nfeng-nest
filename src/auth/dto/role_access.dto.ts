import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class CreateRoleAccessDto {
  @ApiPropertyOptional({ description: '角色ID', example: 1 })
  @IsString()
  roleId: string;

  @ApiPropertyOptional({ description: '授权节点', example: [1, 4, 5] })
  @IsArray()
  accessIds: number[];
}
