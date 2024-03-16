import { IsNotEmpty } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePeopleInfoDto {
  @ApiPropertyOptional({ description: '桌号' })
  @IsNotEmpty({ message: '请填写桌号' })
  tableId: string;

  @ApiPropertyOptional({ description: '用餐人数' })
  @IsNotEmpty({ message: '请填写用餐人数' })
  pNum: string;

  @ApiPropertyOptional({ description: '备注口味信息' })
  pMark: string;
}
