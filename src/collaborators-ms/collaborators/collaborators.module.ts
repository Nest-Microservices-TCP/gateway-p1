import { Module } from '@nestjs/common';

import { CollaboratorsKafkaClientModule } from 'src/kafka-clients';

import { CollaboratorsController } from './collaborators.controller';

@Module({
  imports: [CollaboratorsKafkaClientModule],
  controllers: [CollaboratorsController],
})
export class CollaboratorsModule {}
