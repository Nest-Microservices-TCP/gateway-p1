import { Module } from '@nestjs/common';

import { RoomsKafkaClientModule } from 'src/kafka-clients';

import { ReservationsStatesController } from './reservations-states.controller';

@Module({
  imports: [RoomsKafkaClientModule],
  controllers: [ReservationsStatesController],
})
export class ReservationsStatesModule {}
