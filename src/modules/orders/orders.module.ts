import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { OrdersService } from './orders.service'
import { OrdersController } from './orders.controller'
import { Order } from '../../entity/Order'
import { PaymentsModule } from '../payments/payments.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    PaymentsModule,
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
