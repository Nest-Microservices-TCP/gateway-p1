import { Module } from '@nestjs/common';
import { CollaboratorsController } from './collaborators.controller';
import { CollaboratorsGrpcProvider } from 'src/grpc-clients/collaborators';

@Module({
  providers: [CollaboratorsGrpcProvider],
  controllers: [CollaboratorsController],
})
export class CollaboratorsModule {}
