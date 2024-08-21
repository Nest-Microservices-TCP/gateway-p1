import { Module } from '@nestjs/common';
import { RoomsModule } from './rooms/rooms.module';
import { RoomsStatesModule } from './rooms-states/rooms-states.module';

@Module({
  imports: [RoomsModule, RoomsStatesModule],
  controllers: [],
  providers: [],
})
export class RoomsMSModule {}
