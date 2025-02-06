import { Module } from '@nestjs/common';

import { AreasModule } from './areas/areas.module';
import { CollaboratorsModule } from './collaborators/collaborators.module';
import { PositionsModule } from './positions/positions.module';
import { WorkShiftsModule } from './work-shifts/work-shifts.module';

@Module({
  imports: [
    AreasModule,
    PositionsModule,
    WorkShiftsModule,
    CollaboratorsModule,
  ],
})
export class CollaboratorsMSModule {}
