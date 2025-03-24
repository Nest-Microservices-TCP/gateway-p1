import {
  Get,
  Post,
  Body,
  Param,
  Inject,
  Controller,
  UseInterceptors,
  ParseUUIDPipe,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ErrorInterceptor } from 'src/common/interceptors';

import {
  Position,
  PositionsServiceClient,
} from 'src/grpc/proto/collaborators/positions.pb';

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

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) position_id: string,
  ): Promise<Position> {
    return await firstValueFrom(
      this.positionsGrpcClient.findOne({ position_id }),
    );
  }
}
