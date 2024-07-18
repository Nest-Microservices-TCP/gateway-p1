import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsClientMS } from 'src/clients-ms';

@Module({
  imports: [RoomsClientMS],
  controllers: [RoomsController],
  providers: [],
})
export class RoomsModule {}
