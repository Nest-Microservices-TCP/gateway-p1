import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { COLLABORATORS_MICROSERVICE } from 'src/config';

import { ErrorInterceptor } from 'src/common/interceptors';

import { DeleteResultResponse } from 'src/common/dto/response';
import { CreatePositionDto, UpdatePositionDto } from './dto/request';
import { PositionResponseDto } from './dto/response';

@Controller('positions')
@UseInterceptors(ErrorInterceptor)
export class PositionsController {
  constructor(
    @Inject(COLLABORATORS_MICROSERVICE)
    private readonly collaboratorsClient: ClientProxy,
  ) {}

  @Get()
  findAll(): Promise<PositionResponseDto[]> {
    return firstValueFrom(
      this.collaboratorsClient.send({ cmd: 'find.all.positions' }, {}),
    );
  }

  @Get(':id')
  findOne(@Param('id') positionId: string): Promise<PositionResponseDto> {
    return firstValueFrom(
      this.collaboratorsClient.send(
        { cmd: 'find.one.position' },
        { positionId },
      ),
    );
  }

  @Post()
  save(@Body() request: CreatePositionDto): Promise<PositionResponseDto> {
    return firstValueFrom(
      this.collaboratorsClient.send({ cmd: 'save.position' }, request),
    );
  }

  @Patch()
  update(@Body() request: UpdatePositionDto): Promise<PositionResponseDto> {
    return firstValueFrom(
      this.collaboratorsClient.send({ cmd: 'update.position' }, request),
    );
  }

  @Delete(':id')
  remove(@Param('id') positionId: string): Promise<DeleteResultResponse> {
    return firstValueFrom(
      this.collaboratorsClient.send(
        { cmd: 'remove.position.by.id' },
        { positionId },
      ),
    );
  }
}
