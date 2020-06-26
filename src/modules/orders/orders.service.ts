import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Order, OrderStatus } from '../../entity/Order'

import { VerifyResult } from '../payments/payments.dto'
import { PaymentsService } from '../payments/payments.service'

import { CreateOrderDto } from './orders.dto'

const AUTO_DELIVERED_PERIOD = 30 * 1000
@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    private paymentsService: PaymentsService,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.ordersRepository.find()
  }

  async findOne(id: number): Promise<Order> {
    return this.ordersRepository.findOne(id)
  }

  async save(createOrderDto: CreateOrderDto): Promise<Order> {
    const newOrder = await this.ordersRepository.save(createOrderDto)
    const response = await this.paymentsService.verify(newOrder)
    if (response.status === VerifyResult.Confirmed) {
      this.scheduleDeliveredUpdate(newOrder)
    }

    return newOrder
  }

  private async scheduleDeliveredUpdate (order: Order) {
    setTimeout(async () => {
      const latestOrder = await this.ordersRepository.save({
        id: order.id,
        status: OrderStatus.Delivered,
      })
      console.log('order delivery updated', latestOrder)
    }, AUTO_DELIVERED_PERIOD)
  }
}
