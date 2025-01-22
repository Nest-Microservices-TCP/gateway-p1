import { Module } from '@nestjs/common';

import { RoomsClientMS } from 'src/providers';

import { ExtrasController } from './extras.controller';

@Module({
  imports: [RoomsClientMS],
  controllers: [ExtrasController],
})
export class ExtrasModule {}
