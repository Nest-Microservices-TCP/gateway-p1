import {
  Body,
  Post,
  Inject,
  Controller,
  UseInterceptors,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ErrorInterceptor } from 'src/common/interceptors';

import { PositionsServiceClient } from 'src/grpc/proto/collaborators/positions.pb';

import { POSITIONS_GRPC_CLIENT } from 'src/grpc-clients/collaborators';

import { CreatePositionDto } from './dto/request';

@Controller('positions')
@UseInterceptors(ErrorInterceptor)
export class PositionsController {
  constructor(
    @Inject(POSITIONS_GRPC_CLIENT)
    private readonly positionsGrpcClient: PositionsServiceClient,
  ) {}

  @Post()
  async save(@Body() request: CreatePositionDto): Promise<void> {
    firstValueFrom(this.positionsGrpcClient.save(request));
  }
}
