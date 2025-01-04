import { Module } from '@nestjs/common';

import { RoomsClientMS } from 'src/providers';

import { ReservationsOriginsController } from './reservations-origins.controller';

@Module({
  imports: [RoomsClientMS],
  controllers: [ReservationsOriginsController],
})
export class ReservationsOriginsModule {}
