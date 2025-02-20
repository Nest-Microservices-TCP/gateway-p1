import { Module } from '@nestjs/common';

import { RoomsKafkaClientModule } from 'src/kafka-clients';

import { RoomsController } from './rooms.controller';

@Module({
  imports: [RoomsKafkaClientModule],
  controllers: [RoomsController],
})
export class RoomsModule {}
