import { Module } from '@nestjs/common';
import { RentsController } from './rents.controller';

import { RentsGrpcProvider } from 'src/grpc-clients/rooms';

@Module({
  providers: [RentsGrpcProvider],
  controllers: [RentsController],
})
export class RentsModule {}
