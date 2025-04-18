import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';

import { RoomsGrpcProvider } from 'src/grpc-clients/rooms/rooms-grpc.provider';

@Module({
  providers: [RoomsGrpcProvider],
  controllers: [RoomsController],
})
export class RoomsModule {}
