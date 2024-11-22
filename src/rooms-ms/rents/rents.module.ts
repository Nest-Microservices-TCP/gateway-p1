import { RentsController } from './rents.controller';
import { RoomsClientMS } from 'src/providers';
import { Module } from '@nestjs/common';

@Module({
  imports: [RoomsClientMS],
  controllers: [RentsController],
})
export class RentsModule {}
