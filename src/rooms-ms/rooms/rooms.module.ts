import { RoomsController } from './rooms.controller';
import { RoomsClientMS } from 'src/providers';
import { Module } from '@nestjs/common';

@Module({
  imports: [RoomsClientMS],
  controllers: [RoomsController],
})
export class RoomsModule {}
