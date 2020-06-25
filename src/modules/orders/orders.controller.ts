import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'

import { Order } from '../../entity/Order'

import * as OrdersDto from './orders.dto'
import { OrdersService } from './orders.service'

@Controller('order')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: OrdersDto.CreateOrderDto): Promise<Order> {
    return this.ordersService.save(createOrderDto)
  }

  @Put(':id')
  update(@Body() updateOrderDto: OrdersDto.CreateOrderDto): Promise<Order> {
    return this.ordersService.save(updateOrderDto)
  }

  @Get()
  findAll(): Promise<Order[]> {
    return this.ordersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Order> {
    return this.ordersService.findOne(id)
  }
}
