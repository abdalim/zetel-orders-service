import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { Order } from '../../entity/Order';

import * as OrdersDto from './orders.dto';
import { OrdersService } from './orders.service';

@Controller('order')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() saveOrderDto: OrdersDto.SaveOrderDto): Promise<Order> {
    return this.ordersService.save(saveOrderDto);
  }

  @Put(':id')
  update(@Body() saveOrderDto: OrdersDto.SaveOrderDto): Promise<Order> {
    return this.ordersService.save(saveOrderDto);
  }

  @Get()
  findAll(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Order> {
    return this.ordersService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.ordersService.remove(id);
  }
}