import { Module } from '@nestjs/common';

import { RatesModule } from './rates/rates.module';
import { RentsModule } from './rents/rents.module';
import { RoomsModule } from './rooms/rooms.module';
import { ExtrasModule } from './extras/extras.module';
import { AmenitiesModule } from './amenities/amenities.module';
import { RoomsStatesModule } from './rooms-states/rooms-states.module';
import { ReservationsModule } from './reservations/reservations.module';
import { ReservationsStatesModule } from './reservations-states/reservations-states.module';
import { ReservationsOriginsModule } from './reservations-origins/reservations-origins.module';

@Module({
  imports: [
    RoomsModule,
    RentsModule,
    RatesModule,
    ExtrasModule,
    AmenitiesModule,
    RoomsStatesModule,
    ReservationsModule,
    ReservationsStatesModule,
    ReservationsOriginsModule,
  ],
  controllers: [],
  providers: [],
})
export class RoomsMSModule {}
