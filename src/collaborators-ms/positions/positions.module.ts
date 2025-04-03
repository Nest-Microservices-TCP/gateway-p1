import { Module } from '@nestjs/common';
import { PositionsController } from './positions.controller';
import { PositionsGrpcProvider } from 'src/grpc-clients/collaborators';

@Module({
  providers: [PositionsGrpcProvider],
  controllers: [PositionsController],
})
export class PositionsModule {}
