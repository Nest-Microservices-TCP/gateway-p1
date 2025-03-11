import { Module } from '@nestjs/common';

import { ReservationsStatesController } from './reservations-states.controller';

import { ReservationsStatesGrpcProvider } from 'src/grpc-clients/rooms/reservations-states-grpc.provider';

@Module({
  providers: [ReservationsStatesGrpcProvider],
  controllers: [ReservationsStatesController],
})
export class ReservationsStatesModule {}
