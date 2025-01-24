import { Module } from '@nestjs/common';

import { RoomsClientMS } from 'src/providers';

import { RoomStatesController } from './rooms-states.controller';

@Module({
  imports: [RoomsClientMS],
  controllers: [RoomStatesController],
  providers: [],
})
export class RoomsStatesModule {}
