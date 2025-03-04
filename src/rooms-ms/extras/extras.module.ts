import { Module } from '@nestjs/common';

import { ExtrasController } from './extras.controller';

import { ExtrasGrpcProvider } from 'src/grpc-clients/rooms';

@Module({
  providers: [ExtrasGrpcProvider],
  controllers: [ExtrasController],
})
export class ExtrasModule {}
