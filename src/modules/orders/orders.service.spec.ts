import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'

import { OrdersController } from './orders.controller'
import { OrdersService } from './orders.service'
import { getMockOrder, Order, OrderStatus } from '../../entity/Order'
import { Repository } from 'typeorm'
import { PaymentsService } from '../payments/payments.service'
import { VerifyResult } from '../payments/payments.dto'

const mockOrder = getMockOrder()

describe('Orders Service', () => {
  let ordersService: OrdersService
  let ordersRepository: Repository<Order>
  let paymentsService: PaymentsService

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: getRepositoryToken(Order),
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
            find: jest.fn(),
          },
        },
        {
          provide: PaymentsService,
          useValue: {
            verify: jest.fn(),
          },
        },
      ],
      controllers: [OrdersController],
    }).compile()

    ordersService = moduleRef.get<OrdersService>(OrdersService)
    ordersRepository = moduleRef.get(getRepositoryToken(Order))
    paymentsService = moduleRef.get<PaymentsService>(PaymentsService)
  })

  describe('findAll', () => {
    it('should return list of orders', async () => {
      const result = [mockOrder]
      jest.spyOn(ordersRepository, 'find').mockResolvedValueOnce(result)
      expect(await ordersService.findAll()).toBe(result)
    })
  })

  describe('findOne', () => {
    it('should return an order if exists', async () => {
      jest.spyOn(ordersRepository, 'findOne').mockResolvedValueOnce(mockOrder)
      expect(await ordersService.findOne(1)).toBe(mockOrder)
    })

    it('should return undefined if order with id does not exists', async () => {
      jest.spyOn(ordersRepository, 'findOne').mockResolvedValueOnce(undefined)
      expect(await ordersService.findOne(1)).toBeUndefined()
    })
  })

  describe('create', () => {
    it('should return the order if successful', async () => {
      const saveParam = {
        ...mockOrder,
      }
      delete saveParam.id
      delete saveParam.createdAt
      delete saveParam.updatedAt
      jest.spyOn(ordersRepository, 'save').mockResolvedValueOnce(mockOrder)
      jest.spyOn(paymentsService, 'verify').mockResolvedValueOnce({
        status: VerifyResult.Confirmed,
      })
      expect(await ordersService.create(saveParam)).toBe(mockOrder)
    })
  })

  describe('cancel', () => {
    it('should return the order if cancelled successfully', async () => {
      const mockCancelledOrder = { ...mockOrder }
      mockCancelledOrder.status = OrderStatus.Cancelled
      jest.spyOn(ordersRepository, 'findOne').mockResolvedValueOnce(mockOrder)
      jest.spyOn(ordersRepository, 'save').mockResolvedValueOnce(mockCancelledOrder)
      expect(await ordersService.cancel(mockOrder.id)).toBe(mockCancelledOrder)
    })
  })
})
