import { RoomStatesController } from './rooms-states.controller';
import { RoomsClientMS } from 'src/providers';
import { Module } from '@nestjs/common';

@Module({
  imports: [RoomsClientMS],
  controllers: [RoomStatesController],
  providers: [],
})
export class RoomsStatesModule {}
