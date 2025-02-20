import { Module } from '@nestjs/common';

import { CollaboratorsKafkaClientModule } from 'src/kafka-clients';

import { WorkShiftsController } from './work-shifts.controller';

@Module({
  imports: [CollaboratorsKafkaClientModule],
  controllers: [WorkShiftsController],
})
export class WorkShiftsModule {}
