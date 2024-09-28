import { Module } from '@nestjs/common';
import { CollaboratorsClient } from 'src/providers';
import { CollaboratorsController } from '../collaborators/collaborators.controller';

@Module({
  imports: [CollaboratorsClient],
  controllers: [CollaboratorsController],
})
export class PositionsModule {}
