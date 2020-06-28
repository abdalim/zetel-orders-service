import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'

import { OrdersController } from './orders.controller'
import { OrdersService } from './orders.service'
import { getMockOrder, Order, OrderStatus } from '../../entity/Order'
import { PaymentsService } from '../payments/payments.service'
import { VerifyResult } from '../payments/payments.dto'

const mockOrder = getMockOrder()

describe('Orders Controller', () => {
  let orderController: OrdersController
  let ordersService: OrdersService
  let paymentsService: PaymentsService

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: getRepositoryToken(Order),
          useValue: {
            save: jest.fn(),
            findAll: jest.fn(),
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

    orderController = moduleRef.get<OrdersController>(OrdersController)
    ordersService = moduleRef.get<OrdersService>(OrdersService)
    paymentsService = moduleRef.get<PaymentsService>(PaymentsService)
  })

  describe('POST /order', () => {
    it('should create an order', async () => {
      const createParam = {
        item: mockOrder.item,
        price: mockOrder.price,
      }
      jest.spyOn(ordersService, 'create').mockResolvedValueOnce(mockOrder)
      jest.spyOn(paymentsService, 'verify').mockResolvedValueOnce({
        status: VerifyResult.Confirmed,
      })
      expect(await orderController.create(createParam)).toBe(mockOrder)
    })
  })

  describe('GET /order', () => {
    it('should return list of orders', async () => {
      const result = [mockOrder]
      jest.spyOn(ordersService, 'findAll').mockResolvedValueOnce(result)
      expect(await orderController.findAll()).toEqual(result)
    })
  })

  describe('GET /order/:id', () => {
    it('should get an order', async () => {
      jest.spyOn(ordersService, 'findOne').mockResolvedValueOnce(mockOrder)
      expect(await orderController.findOne(1)).toBe(mockOrder)
    })
  })

  describe('DELETE /order/:id', () => {
    it('should cancel an order', async () => {
      const mockCancelledOrder = { ...mockOrder }
      mockCancelledOrder.status = OrderStatus.Cancelled
      jest.spyOn(ordersService, 'cancel').mockResolvedValueOnce(mockCancelledOrder)
      expect(await orderController.cancel(mockOrder.id)).toBe(mockCancelledOrder)
    })
  })
})
