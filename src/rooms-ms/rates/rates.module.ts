import { Module } from '@nestjs/common';

// import { RoomsClientMS } from 'src/providers';
import { RoomsKafkaClientModule } from 'src/kafka-clients';

import { RatesController } from './rates.controller';

@Module({
  imports: [RoomsKafkaClientModule],
  controllers: [RatesController],
})
export class RatesModule {}
