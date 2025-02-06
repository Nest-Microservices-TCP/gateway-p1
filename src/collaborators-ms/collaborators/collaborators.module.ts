import { Module } from '@nestjs/common';

import { CollaboratorsClientMS } from 'src/providers';

import { CollaboratorsController } from './collaborators.controller';

@Module({
  imports: [CollaboratorsClientMS],
  controllers: [CollaboratorsController],
})
export class CollaboratorsModule {}
