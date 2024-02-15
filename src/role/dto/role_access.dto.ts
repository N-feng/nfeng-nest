import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRoleAccessDto {
  @ApiPropertyOptional({ description: '角色ID', example: 3 })
  roleId: string;
  @ApiPropertyOptional({ description: '授权节点', example: [1, 4, 5] })
  accessIds: string[];
}
