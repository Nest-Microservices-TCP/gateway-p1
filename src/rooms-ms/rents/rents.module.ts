import { Module } from '@nestjs/common';

import { RoomsClientMS } from 'src/providers';

import { RentsController } from './rents.controller';
import { RoomsKafkaClientModule } from 'src/kafka-clients';

@Module({
  imports: [RoomsClientMS, RoomsKafkaClientModule],
  controllers: [RentsController],
})
export class RentsModule {}
