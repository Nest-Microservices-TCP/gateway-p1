import { Module } from '@nestjs/common';

import { CollaboratorsClient } from 'src/providers';

import { AreasController } from './areas.controller';

@Module({
  imports: [CollaboratorsClient],
  controllers: [AreasController],
})
export class AreasModule {}
