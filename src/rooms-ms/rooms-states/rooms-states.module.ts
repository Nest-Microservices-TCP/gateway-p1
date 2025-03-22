import { Module } from '@nestjs/common';
import { RoomStatesController } from './rooms-states.controller';
import { RoomsStatesGrpcProvider } from 'src/grpc-clients/rooms';

@Module({
  controllers: [RoomStatesController],
  providers: [RoomsStatesGrpcProvider],
})
export class RoomsStatesModule {}
