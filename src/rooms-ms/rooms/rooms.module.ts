import { Module } from '@nestjs/common';

import { RoomsClientMS } from 'src/providers';

import { RoomsController } from './rooms.controller';

@Module({
  imports: [RoomsClientMS],
  controllers: [RoomsController],
})
export class RoomsModule {}
