import { Module } from '@nestjs/common';
import { CollaboratorsController } from '../collaborators/collaborators.controller';
import { PositionsGrpcProvider } from 'src/grpc-clients/collaborators';

@Module({
  providers: [PositionsGrpcProvider],
  controllers: [CollaboratorsController],
})
export class PositionsModule {}
