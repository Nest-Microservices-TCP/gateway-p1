import { ExtrasController } from './extras.controller';
import { RoomsClientMS } from 'src/providers';
import { Module } from '@nestjs/common';

@Module({
  imports: [RoomsClientMS],
  controllers: [ExtrasController],
})
export class ExtrasModule {}
