import { Module } from '@nestjs/common';

import { TransactionsKafkaClientModule } from 'src/kafka-clients';
import { PaymentsController } from './payments.controller';

@Module({
  imports: [TransactionsKafkaClientModule],
  controllers: [PaymentsController],
})
export class PaymentsModule {}
