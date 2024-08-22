import { Module } from '@nestjs/common';
import { RoomStatesController } from './rooms-states.controller';
import { RoomsClientMS } from 'src/providers';

@Module({
  imports: [RoomsClientMS],
  controllers: [RoomStatesController],
  providers: [],
})
export class RoomsStatesModule {}
