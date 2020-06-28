import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Order, OrderStatus } from '../../entity/Order'

import { VerifyResult } from '../payments/payments.dto'
import { PaymentsService } from '../payments/payments.service'

import { CreateOrderDto } from './orders.dto'

const AUTO_DELIVERED_PERIOD = 40 * 1000
@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    private paymentsService: PaymentsService,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.ordersRepository.find({
      order: {
        updatedAt: 'DESC',
      },
    })
  }

  async findOne(id: number): Promise<Order> {
    return this.ordersRepository.findOne(id)
  }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const newOrder = await this.ordersRepository.save(createOrderDto)
    this.processNewOrder(newOrder)
    return newOrder
  }

  async cancel(id: number): Promise<Order> {
    const currentOrder = await this.ordersRepository.findOne(id)
    if (!currentOrder) {
      return
    }

    if (currentOrder.status === OrderStatus.Delivered) {
      return
    }

    return this.ordersRepository.save({
      id: currentOrder.id,
      status: OrderStatus.Cancelled,
    })
  }

  private async processNewOrder (newOrder: Order) {
    try {
      const response = await this.paymentsService.verify(newOrder)

      if (response.status === VerifyResult.Confirmed) {
        await this.ordersRepository.save({
          id: newOrder.id,
          status: OrderStatus.Confirmed,
        })
        this.scheduleDeliveredUpdate(newOrder)
      } else {
        await this.ordersRepository.save({
          id: newOrder.id,
          status: OrderStatus.Cancelled,
        })
      }
    } catch (error) {
      console.error('Error in processing new order', error)
    }
  }

  private async scheduleDeliveredUpdate (order: Order) {
    setTimeout(async () => {
      const currentOrder = await this.ordersRepository.findOne(order.id)
      if (currentOrder.status === OrderStatus.Cancelled) {
        // don't deliver order if user already cancelled
        console.log(`Order not delivered due to cancellation`, { currentOrder })
        return
      }

      const latestOrder = await this.ordersRepository.save({
        id: order.id,
        status: OrderStatus.Delivered,
      })
      console.log(`Order delivered`, { latestOrder })
    }, AUTO_DELIVERED_PERIOD)
  }
}
