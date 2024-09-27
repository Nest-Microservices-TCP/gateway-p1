import { WorkShiftsController } from './work-shifts.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [WorkShiftsController],
})
export class WorkShiftsModule {}
