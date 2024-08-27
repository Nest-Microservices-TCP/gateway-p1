import { Module } from '@nestjs/common';
import { CollaboratorsController } from './collaborators.controller';
import { CollaboratorsClient } from 'src/providers';

@Module({
  controllers: [CollaboratorsController],
  providers: [CollaboratorsClient],
})
export class CollaboratorsModule {}
