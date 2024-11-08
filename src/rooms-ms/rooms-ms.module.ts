import { RoomsStatesModule } from './rooms-states/rooms-states.module';
import { RoomsModule } from './rooms/rooms.module';
import { RentsModule } from './rents/rents.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [RoomsModule, RoomsStatesModule, RentsModule],
  controllers: [],
  providers: [],
})
export class RoomsMSModule {}
