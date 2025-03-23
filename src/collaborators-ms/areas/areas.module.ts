import { Module } from '@nestjs/common';
import { AreasController } from './areas.controller';
import { AreasGrpcProvider } from 'src/grpc-clients/collaborators';

@Module({
  providers: [AreasGrpcProvider],
  controllers: [AreasController],
})
export class AreasModule {}
