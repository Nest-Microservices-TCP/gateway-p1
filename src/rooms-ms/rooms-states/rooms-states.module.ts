import { Module } from '@nestjs/common';
import { RoomStatesController } from './rooms-states.controller';
import { RoomsMSModule } from '../rooms-ms.module';

@Module({
  imports: [RoomsMSModule],
  controllers: [RoomStatesController],
  providers: [],
})
export class RoomsStatesModule {}
