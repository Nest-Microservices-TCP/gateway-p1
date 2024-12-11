import { WorkShiftsController } from './work-shifts.controller';
import { CollaboratorsClient } from 'src/providers';
import { Module } from '@nestjs/common';

@Module({
  imports: [CollaboratorsClient],
  controllers: [WorkShiftsController],
})
export class WorkShiftsModule {}
