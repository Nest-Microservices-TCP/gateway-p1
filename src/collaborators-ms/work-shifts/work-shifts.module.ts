import { CollaboratorsClient } from 'src/providers';
import { WorkShiftsController } from './work-shifts.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [CollaboratorsClient],
  controllers: [WorkShiftsController],
})
export class WorkShiftsModule {}
