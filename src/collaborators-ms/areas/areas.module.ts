import { AreasController } from './areas.controller';
import { CollaboratorsClient } from 'src/providers';
import { Module } from '@nestjs/common';

@Module({
  imports: [CollaboratorsClient],
  controllers: [AreasController],
})
export class AreasModule {}
