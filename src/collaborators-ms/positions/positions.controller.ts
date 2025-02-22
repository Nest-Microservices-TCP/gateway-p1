import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { COLLABORATORS_KAFKA_CLIENT } from 'src/config';

import { ErrorInterceptor } from 'src/common/interceptors';

import { DeleteResultResponse } from 'src/common/dto/response';
import { CreatePositionDto, UpdatePositionDto } from './dto/request';
import { PositionResponseDto } from './dto/response';

@Controller('positions')
@UseInterceptors(ErrorInterceptor)
export class PositionsController implements OnModuleInit {
  constructor(
    @Inject(COLLABORATORS_KAFKA_CLIENT)
    private readonly collaboratorsClientKafka: ClientKafka,
  ) {}

  onModuleInit() {
    this.collaboratorsClientKafka.subscribeToResponseOf('positions.find.all');
    this.collaboratorsClientKafka.subscribeToResponseOf('positions.find.one');
    this.collaboratorsClientKafka.subscribeToResponseOf('positions.save');
    this.collaboratorsClientKafka.subscribeToResponseOf('positions.update');
    this.collaboratorsClientKafka.subscribeToResponseOf('positions.remove');
  }

  @Get()
  async findAll(): Promise<PositionResponseDto[]> {
    return firstValueFrom(
      this.collaboratorsClientKafka.send('positions.find.all', {}),
    );
  }

  @Get(':id')
  async findOne(@Param('id') positionId: string): Promise<PositionResponseDto> {
    return firstValueFrom(
      this.collaboratorsClientKafka.send('positions.find.one', {
        positionId,
      }),
    );
  }

  @Post()
  async save(@Body() request: CreatePositionDto): Promise<PositionResponseDto> {
    return firstValueFrom(
      this.collaboratorsClientKafka.send('positions.save', request),
    );
  }

  @Patch()
  async update(
    @Body() request: UpdatePositionDto,
  ): Promise<PositionResponseDto> {
    return firstValueFrom(
      this.collaboratorsClientKafka.send('positions.update', request),
    );
  }

  @Delete(':id')
  async remove(@Param('id') positionId: string): Promise<DeleteResultResponse> {
    return firstValueFrom(
      this.collaboratorsClientKafka.send('positions.remove', {
        positionId,
      }),
    );
  }
}
