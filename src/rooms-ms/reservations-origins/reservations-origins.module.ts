import { Module } from '@nestjs/common';

import { RoomsKafkaClientModule } from 'src/kafka-clients';

import { ReservationsOriginsController } from './reservations-origins.controller';

@Module({
  imports: [RoomsKafkaClientModule],
  controllers: [ReservationsOriginsController],
})
export class ReservationsOriginsModule {}
