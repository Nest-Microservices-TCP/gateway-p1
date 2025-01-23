import { Module } from '@nestjs/common';

import { RoomsClientMS } from 'src/providers';

import { RatesController } from './rates.controller';

@Module({
  imports: [RoomsClientMS],
  controllers: [RatesController],
})
export class RatesModule {}
