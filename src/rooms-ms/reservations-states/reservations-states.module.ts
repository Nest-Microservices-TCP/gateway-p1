import { Module } from '@nestjs/common';

import { RoomsClientMS } from 'src/providers';

import { ReservationsStatesController } from './reservations-states.controller';

@Module({
  imports: [RoomsClientMS],
  controllers: [ReservationsStatesController],
})
export class ReservationsStatesModule {}
