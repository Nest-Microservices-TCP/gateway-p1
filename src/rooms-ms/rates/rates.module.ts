import { Module } from '@nestjs/common';

import { RatesController } from './rates.controller';

import { RoomsKafkaClientModule } from 'src/kafka-clients';
import { RatesGrpcProvider } from 'src/grpc-clients/rooms/rates-grpc.provider';

@Module({
  imports: [RoomsKafkaClientModule],
  providers: [RatesGrpcProvider],
  controllers: [RatesController],
})
export class RatesModule {}
