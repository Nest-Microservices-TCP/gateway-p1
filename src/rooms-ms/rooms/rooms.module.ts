import { Module } from '@nestjs/common';
import { RoomsClientMS } from 'src/providers';

@Module({
  imports: [RoomsClientMS],
})
export class RoomsModule {}
