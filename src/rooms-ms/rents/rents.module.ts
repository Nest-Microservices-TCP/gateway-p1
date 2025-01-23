import { Module } from '@nestjs/common';

import { RoomsClientMS } from 'src/providers';

import { RentsController } from './rents.controller';

@Module({
  imports: [RoomsClientMS],
  controllers: [RentsController],
})
export class RentsModule {}
