import { Module } from '@nestjs/common';
import { CollaboratorsController } from './collaborators.controller';
import { CollaboratorsClient } from 'src/providers';

@Module({
  imports: [CollaboratorsClient],
  controllers: [CollaboratorsController],
})
export class CollaboratorsModule {}
