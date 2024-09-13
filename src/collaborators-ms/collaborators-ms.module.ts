import { Module } from '@nestjs/common';
import { CollaboratorsModule } from './collaborators/collaborators.module';
import { AreasModule } from './areas/areas.module';
import { PositionsModule } from './positions/positions.module';

@Module({
  imports: [CollaboratorsModule, AreasModule, PositionsModule],
})
export class CollaboratorsMSModule {}
