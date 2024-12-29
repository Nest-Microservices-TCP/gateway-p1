import { ReservationsStatesModule } from './reservations-states/reservations-states.module';
import { ReservationsModule } from './reservations/reservations.module';
import { RoomsStatesModule } from './rooms-states/rooms-states.module';
import { ExtrasModule } from './extras/extras.module';
import { RoomsModule } from './rooms/rooms.module';
import { RentsModule } from './rents/rents.module';
import { RatesModule } from './rates/rates.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    RoomsModule,
    RentsModule,
    RatesModule,
    ExtrasModule,
    RoomsStatesModule,
    ReservationsModule,
    ReservationsStatesModule,
  ],
  controllers: [],
  providers: [],
})
export class RoomsMSModule {}
