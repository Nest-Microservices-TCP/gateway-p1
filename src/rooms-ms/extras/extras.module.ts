import { Module } from '@nestjs/common';

import { RoomsKafkaClientModule } from 'src/kafka-clients';

import { ExtrasController } from './extras.controller';

@Module({
  imports: [RoomsKafkaClientModule],
  controllers: [ExtrasController],
})
export class ExtrasModule {}
