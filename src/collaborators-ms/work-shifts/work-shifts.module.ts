import { Module } from '@nestjs/common';

import { CollaboratorsClientMS } from 'src/providers';

import { WorkShiftsController } from './work-shifts.controller';

@Module({
  imports: [CollaboratorsClientMS],
  controllers: [WorkShiftsController],
})
export class WorkShiftsModule {}
