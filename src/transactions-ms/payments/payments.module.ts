import { Module } from '@nestjs/common';

import { TransactionsClientMS } from 'src/providers';

import { PaymentsController } from './payments.controller';
import { TransactionsKafkaClientModule } from 'src/kafka-clients';

@Module({
  imports: [TransactionsClientMS, TransactionsKafkaClientModule],
  controllers: [PaymentsController],
})
export class PaymentsModule {}
