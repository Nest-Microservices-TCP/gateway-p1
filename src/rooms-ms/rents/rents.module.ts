import { Module } from '@nestjs/common';
import { RentsController } from './rents.controller';

import { RentsRMQProvider } from 'src/rmq-clients/rooms/rooms-rmq.provider';

@Module({
  providers: [RentsRMQProvider],
  controllers: [RentsController],
})
export class RentsModule {}
