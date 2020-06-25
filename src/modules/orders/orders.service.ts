import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from '../../entity/Order';

import { SaveOrderDto } from './orders.dto'

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.ordersRepository.find();
  }

  async findOne(id: number): Promise<Order> {
    return this.ordersRepository.findOne(id);
  }

  async save(saveOrderDto: SaveOrderDto): Promise<Order> {
    const order = new Order();
    // TODO: set order from DTO
    return this.ordersRepository.save(order);
  }

  async remove(id: number): Promise<void> {
    await this.ordersRepository.delete(id);
  }
}