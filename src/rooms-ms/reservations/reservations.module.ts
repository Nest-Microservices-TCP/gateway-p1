import { Module } from '@nestjs/common';

import { RoomsClientMS } from 'src/providers';

import { ReservationsController } from './reservations.controller';

@Module({
  imports: [RoomsClientMS],
  controllers: [ReservationsController],
})
export class ReservationsModule {}
