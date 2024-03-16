import { CommonModule } from '@app/common';
import { Module } from '@nestjs/common';
import { CartController } from './cart/cart.controller';
import { CartService } from './cart/cart.service';
import { PeopleInfoService } from './people-info/people-info.service';
import { PeopleInfoController } from './people-info/people-info.controller';
import { OrderService } from './order/order.service';
import { OrderController } from './order/order.controller';

@Module({
  imports: [CommonModule],
  controllers: [CartController, PeopleInfoController, OrderController],
  providers: [CartService, PeopleInfoService, OrderService],
})
export class AppModule {}
