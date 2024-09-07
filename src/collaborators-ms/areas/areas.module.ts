import { Module } from '@nestjs/common';
import { AreasController } from './areas.controller';
import { CollaboratorsClient } from 'src/providers';

@Module({
  imports: [CollaboratorsClient],
  controllers: [AreasController],
})
export class AreasModule {}
