import { Module } from '@nestjs/common';

import { CollaboratorsKafkaClientModule } from 'src/kafka-clients';

import { AreasController } from './areas.controller';

@Module({
  imports: [CollaboratorsKafkaClientModule],
  controllers: [AreasController],
})
export class AreasModule {}
