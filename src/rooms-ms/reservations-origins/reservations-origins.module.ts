import { Module } from '@nestjs/common';

import { ReservationsOriginsGrpcProvider } from 'src/grpc-clients/rooms';

import { ReservationsOriginsController } from './reservations-origins.controller';

@Module({
  providers: [ReservationsOriginsGrpcProvider],
  controllers: [ReservationsOriginsController],
})
export class ReservationsOriginsModule {}
