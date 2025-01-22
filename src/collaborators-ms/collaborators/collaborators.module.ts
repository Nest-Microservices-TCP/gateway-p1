import { Module } from '@nestjs/common';

import { CollaboratorsClient } from 'src/providers';

import { CollaboratorsController } from './collaborators.controller';

@Module({
  imports: [CollaboratorsClient],
  controllers: [CollaboratorsController],
})
export class CollaboratorsModule {}
