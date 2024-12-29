import { ReservationsStatesController } from './reservations-states.controller';
import { RoomsClientMS } from 'src/providers';
import { Module } from '@nestjs/common';

@Module({
  imports: [RoomsClientMS],
  controllers: [ReservationsStatesController],
})
export class ReservationsStatesModule {}
