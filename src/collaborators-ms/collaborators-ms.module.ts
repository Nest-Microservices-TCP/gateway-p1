import { Module } from '@nestjs/common';
import { CollaboratorsModule } from './collaborators/collaborators.module';
import { AreasModule } from './areas/areas.module';

@Module({
  imports: [CollaboratorsModule, AreasModule],
})
export class CollaboratorsMSModule {}
