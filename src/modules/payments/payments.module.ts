import { Module, HttpModule } from '@nestjs/common'

import { PaymentsService } from './payments.service'

@Module({
  imports: [HttpModule],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
