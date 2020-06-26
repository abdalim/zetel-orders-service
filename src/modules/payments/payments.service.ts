import { Injectable, HttpService } from '@nestjs/common'

import { Order } from '../../entity/Order'

import { VerifyOrderResponseDto } from './payments.dto'

@Injectable()
export class PaymentsService {
  constructor(
    private httpService: HttpService,
  ) {}

  async verify(order: Order): Promise<VerifyOrderResponseDto> {
    const response = await this.httpService.post<VerifyOrderResponseDto>(
      'http://payments:3002/payments/verify',
      {
        ...order,
        pin: '1234',
        token: 'abcd'
      }
    ).toPromise()

    console.log('payments/verify response', response.status, response.data)

    return response.data
  }
}
