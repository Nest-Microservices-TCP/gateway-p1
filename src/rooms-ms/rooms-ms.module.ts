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
  ],
  controllers: [],
  providers: [],
})
export class RoomsMSModule {}
