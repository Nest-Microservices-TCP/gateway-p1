import { RatesController } from './rates.controller';
import { RoomsClientMS } from 'src/providers';
import { Module } from '@nestjs/common';

@Module({
  imports: [RoomsClientMS],
  controllers: [RatesController],
})
export class RatesModule {}
