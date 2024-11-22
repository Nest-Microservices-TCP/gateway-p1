import { ReservationsController } from './reservations.controller';
import { RoomsClientMS } from 'src/providers';
import { Module } from '@nestjs/common';

@Module({
  imports: [RoomsClientMS],
  controllers: [ReservationsController],
})
export class ReservationsModule {}
