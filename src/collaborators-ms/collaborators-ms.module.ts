import { CollaboratorsModule } from './collaborators/collaborators.module';
import { WorkShiftsModule } from './work-shifts/work-shifts.module';
import { PositionsModule } from './positions/positions.module';
import { AreasModule } from './areas/areas.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    CollaboratorsModule,
    AreasModule,
    PositionsModule,
    WorkShiftsModule,
  ],
})
export class CollaboratorsMSModule {}
