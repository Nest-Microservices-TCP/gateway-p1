import { CollaboratorsController } from '../collaborators/collaborators.controller';
import { CollaboratorsClient } from 'src/providers';
import { Module } from '@nestjs/common';

@Module({
  imports: [CollaboratorsClient],
  controllers: [CollaboratorsController],
})
export class PositionsModule {}
