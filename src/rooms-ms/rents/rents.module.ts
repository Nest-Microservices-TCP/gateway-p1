import { Module } from '@nestjs/common';

import { RoomsKafkaClientModule } from 'src/kafka-clients';

import { RentsController } from './rents.controller';

@Module({
  imports: [RoomsKafkaClientModule],
  controllers: [RentsController],
})
export class RentsModule {}
