import { Module } from '@nestjs/common';

import { ExtrasModule } from './extras/extras.module';
import { RatesModule } from './rates/rates.module';
import { RentsModule } from './rents/rents.module';
import { ReservationsOriginsModule } from './reservations-origins/reservations-origins.module';
import { ReservationsStatesModule } from './reservations-states/reservations-states.module';
import { ReservationsModule } from './reservations/reservations.module';
import { RoomsStatesModule } from './rooms-states/rooms-states.module';
import { RoomsModule } from './rooms/rooms.module';

@Module({
  imports: [
    RoomsModule,
    RentsModule,
    RatesModule,
    ExtrasModule,
    RoomsStatesModule,
    ReservationsModule,
    ReservationsStatesModule,
    ReservationsOriginsModule,
  ],
  controllers: [],
  providers: [],
})
export class RoomsMSModule {}
