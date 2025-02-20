import { Module } from '@nestjs/common';

import { RoomsKafkaClientModule } from 'src/kafka-clients';

import { ReservationsController } from './reservations.controller';

@Module({
  imports: [RoomsKafkaClientModule],
  controllers: [ReservationsController],
})
export class ReservationsModule {}
