import { Module } from '@nestjs/common';
import { WorkShiftsController } from './work-shifts.controller';
import { WorkShiftsGrpcProvider } from 'src/grpc-clients/collaborators';

@Module({
  providers: [WorkShiftsGrpcProvider],
  controllers: [WorkShiftsController],
})
export class WorkShiftsModule {}
