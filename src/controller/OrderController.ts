import { getRepository } from 'typeorm'
import { NextFunction, Request, Response } from 'express'
import { Order } from '../entity/Order'

export class OrderController {
  private orderRepository = getRepository(Order)

  async all(request: Request, response: Response, next: NextFunction) {
    return this.orderRepository.find()
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.orderRepository.findOne(request.params.id)
  }

  async save(request: Request, response: Response, next: NextFunction) {
    return this.orderRepository.save(request.body)
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    let orderToRemove = await this.orderRepository.findOne(request.params.id)
    await this.orderRepository.remove(orderToRemove)
  }
}
