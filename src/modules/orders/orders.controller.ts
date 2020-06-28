import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common'

import { Order } from '../../entity/Order'

import * as OrdersDto from './orders.dto'
import { OrdersService } from './orders.service'

@Controller('order')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: OrdersDto.CreateOrderDto): Promise<Order> {
    return this.ordersService.create(createOrderDto)
  }

  @Get()
  findAll(): Promise<Order[]> {
    return this.ordersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Order> {
    return this.ordersService.findOne(id)
  }

  @Delete(':id')
  cancel(@Param('id') id: number): Promise<Order> {
    return this.ordersService.cancel(id)
  }
}
