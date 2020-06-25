import { OrderController } from './controller/OrderController'

export const Routes = [
  {
    method: 'get',
    route: '/order',
    controller: OrderController,
    action: 'all',
  },
  {
    method: 'get',
    route: '/order/:id',
    controller: OrderController,
    action: 'one',
  },
  {
    method: 'post',
    route: '/order',
    controller: OrderController,
    action: 'save',
  },
  {
    method: 'delete',
    route: '/order/:id',
    controller: OrderController,
    action: 'remove',
  },
]
