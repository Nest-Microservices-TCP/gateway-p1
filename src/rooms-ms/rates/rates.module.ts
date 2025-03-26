import { Module } from '@nestjs/common';
import { RatesController } from './rates.controller';

import { RatesGrpcProvider } from 'src/grpc-clients/rooms/rates-grpc.provider';

@Module({
  providers: [RatesGrpcProvider],
  controllers: [RatesController],
})
export class RatesModule {}
