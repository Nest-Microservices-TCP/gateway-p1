import { Module } from '@nestjs/common';
import { CollaboratorsModule } from './collaborators/collaborators.module';

@Module({
  imports: [CollaboratorsModule],
  controllers: [],
  providers: [],
})
export class CollaboratorsMSModule {}
