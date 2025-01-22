import { Module } from '@nestjs/common';

import { CollaboratorsClient } from 'src/providers';

import { WorkShiftsController } from './work-shifts.controller';

@Module({
  imports: [CollaboratorsClient],
  controllers: [WorkShiftsController],
})
export class WorkShiftsModule {}
