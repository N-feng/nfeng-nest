import { IsNotEmpty } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiPropertyOptional({ description: '桌号', example: 1 })
  @IsNotEmpty({ message: '请填写桌号' })
  tableId: number;

  @ApiPropertyOptional({ description: '用餐人数', example: 5 })
  @IsNotEmpty({ message: '请填写用餐人数' })
  pNum: number;

  @ApiPropertyOptional({ description: '备注口味信息', example: '不要辣椒' })
  pMark: string;

  @ApiPropertyOptional({
    description: '菜品信息',
    example: [
      {
        productId: 1,
        productImg: '/image/a.png',
        productTitle: '拍黄瓜',
        productPrice: 22,
        productNum: 1,
      },
      {
        productId: 2,
        productImg: '/image/a.png',
        productTitle: '娃娃菜炖豆腐',
        productPrice: 18,
        productNum: 1,
      },
    ],
  })
  @IsNotEmpty({ message: '请填写菜品信息' })
  orderItems: {
    productId: number;
    productImg: string;
    productTitle: string;
    productPrice: number;
    productNum: number;
  }[];

  @ApiPropertyOptional({ description: '总价格', example: 100 })
  @IsNotEmpty({ message: '请填写总价格' })
  totalPrice: number;

  @ApiPropertyOptional({ description: '总数量', example: 2 })
  @IsNotEmpty({ message: '请填写总数量' })
  totalNum: number;
}
