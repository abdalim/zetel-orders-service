import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Order } from '../../entity/Order'

import { CreateOrderDto } from './orders.dto'

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.ordersRepository.find()
  }

  async findOne(id: number): Promise<Order> {
    return this.ordersRepository.findOne(id)
  }

  async save(createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersRepository.save(createOrderDto)
  }
}
