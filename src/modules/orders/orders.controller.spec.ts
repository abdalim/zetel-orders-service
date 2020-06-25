import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Order, OrderStatus } from '../../entity/Order';

describe('Orders Controller', () => {
  let orderController: OrdersController;
  let ordersService: OrdersService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: getRepositoryToken(Order),
          useValue: {
            save: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
      controllers: [OrdersController],
    }).compile();

    orderController = moduleRef.get<OrdersController>(OrdersController);
    ordersService = moduleRef.get<OrdersService>(OrdersService);
  });

  describe('POST /order', () => {
    it('should create an order', async () => {
      const createParam = {
        item: 'abcd',
        price: 50,
      }
      const timestamp = new Date()
      const result = {
        ...createParam,
        id: 1,
        status: OrderStatus.Created,
        createdAt: timestamp,
        updatedAt: timestamp,
      }
      jest.spyOn(ordersService, 'save').mockResolvedValueOnce(result)
      expect(await orderController.create(createParam)).toBe(result);
    });
  });

  describe('PUT /order/:id', () => {
    it('should update an order', async () => {
      const updateParam = {
        item: 'abcd',
        price: 50,
      }
      const timestamp = new Date()
      const result = {
        ...updateParam,
        id: 1,
        status: OrderStatus.Created,
        createdAt: timestamp,
        updatedAt: timestamp,
      }
      jest.spyOn(ordersService, 'save').mockResolvedValueOnce(result)
      expect(await orderController.update(updateParam)).toBe(result);
    });
  });

  describe('GET /order', () => {
    it('should return list of orders', async () => {
      const timestamp = new Date()
      const result = [{
        id: 1,
        status: OrderStatus.Created,
        item: 'abcd',
        price: 50,
        createdAt: timestamp,
        updatedAt: timestamp,
      }]
      jest.spyOn(ordersService, 'findAll').mockResolvedValueOnce(result)
      expect(await orderController.findAll()).toEqual(result);
    });
  });

  describe('GET /order/:id', () => {
    it('should get an order', async () => {
      const timestamp = new Date()
      const result = {
        id: 1,
        status: OrderStatus.Created,
        item: 'abcd',
        price: 50,
        createdAt: timestamp,
        updatedAt: timestamp,
      }
      jest.spyOn(ordersService, 'findOne').mockResolvedValueOnce(result)
      expect(await orderController.findOne(1)).toBe(result);
    });
  });
});
