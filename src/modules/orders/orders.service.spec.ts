import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { getMockOrder, Order } from '../../entity/Order';
import { Repository } from 'typeorm';

const mockOrder = getMockOrder();

describe('Orders Service', () => {
  let ordersService: OrdersService;
  let ordersRepository: Repository<Order>;

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
      ],
      controllers: [OrdersController],
    }).compile();

    ordersService = moduleRef.get<OrdersService>(OrdersService);
    ordersRepository = moduleRef.get(getRepositoryToken(Order));
  });

  describe('findAll', () => {
    it('should return list of orders', async () => {
      const result = [mockOrder];
      jest.spyOn(ordersRepository, 'find').mockResolvedValueOnce(result);
      expect(await ordersService.findAll()).toBe(result);
    })
  })

  describe('findOne', () => {
    it('should return an order if exists', async () => {
      jest.spyOn(ordersRepository, 'findOne').mockResolvedValueOnce(mockOrder);
      expect(await ordersService.findOne(1)).toBe(mockOrder);
    })

    it('should return undefined if order with id does not exists', async () => {
      jest.spyOn(ordersRepository, 'findOne').mockResolvedValueOnce(undefined);
      expect(await ordersService.findOne(1)).toBeUndefined();
    })
  })

  describe('save', () => {
    it('should return the order if successful', async () => {
      const saveParam = {
        ...mockOrder
      }
      delete saveParam.id
      delete saveParam.createdAt
      delete saveParam.updatedAt
      jest.spyOn(ordersRepository, 'save').mockResolvedValueOnce(mockOrder);
      expect(await ordersService.save(saveParam)).toBe(mockOrder);
    })
  })
});
