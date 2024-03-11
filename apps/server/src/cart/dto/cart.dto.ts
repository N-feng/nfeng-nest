import { IsNotEmpty } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCartDto {
  @ApiPropertyOptional({ description: '桌号' })
  @IsNotEmpty({ message: '请填写桌号' })
  tableId: string;

  @ApiPropertyOptional({ description: '菜品' })
  @IsNotEmpty({ message: '请填写菜品' })
  productId: string;
}
