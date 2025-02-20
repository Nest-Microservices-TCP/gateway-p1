import { Module } from '@nestjs/common';

import { RoomStatesController } from './rooms-states.controller';

import { RoomsKafkaClientModule } from 'src/kafka-clients';

@Module({
  imports: [RoomsKafkaClientModule],
  controllers: [RoomStatesController],
  providers: [],
})
export class RoomsStatesModule {}
