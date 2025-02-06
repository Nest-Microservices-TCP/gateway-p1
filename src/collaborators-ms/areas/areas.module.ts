import { Module } from '@nestjs/common';

import { CollaboratorsClientMS } from 'src/providers';

import { AreasController } from './areas.controller';

@Module({
  imports: [CollaboratorsClientMS],
  controllers: [AreasController],
})
export class AreasModule {}
