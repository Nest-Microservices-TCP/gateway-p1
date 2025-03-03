import { Module } from '@nestjs/common';
import { AmenitiesController } from './amenities.controller';

import { AmenitiesGrpcProvider } from 'src/grpc-clients/rooms';

@Module({
  providers: [AmenitiesGrpcProvider],
  controllers: [AmenitiesController],
})
export class AmenitiesModule {}
