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
    this.collaboratorsClientKafka.subscribeToResponseOf(
      'collaborators.find.all.positions',
    );
    this.collaboratorsClientKafka.subscribeToResponseOf(
      'collaborators.find.one.position',
    );
    this.collaboratorsClientKafka.subscribeToResponseOf(
      'collaborators.save.position',
    );
    this.collaboratorsClientKafka.subscribeToResponseOf(
      'collaborators.update.position',
    );
    this.collaboratorsClientKafka.subscribeToResponseOf(
      'collaborators.remove.position',
    );
  }

  @Get()
  async findAll(): Promise<PositionResponseDto[]> {
    return firstValueFrom(
      this.collaboratorsClientKafka.send(
        'collaborators.find.all.positions',
        {},
      ),
    );
  }

  @Get(':id')
  async findOne(@Param('id') positionId: string): Promise<PositionResponseDto> {
    return firstValueFrom(
      this.collaboratorsClientKafka.send('collaborators.find.one.position', {
        positionId,
      }),
    );
  }

  @Post()
  async save(@Body() request: CreatePositionDto): Promise<PositionResponseDto> {
    return firstValueFrom(
      this.collaboratorsClientKafka.send(
        'collaborators.save.position',
        request,
      ),
    );
  }

  @Patch()
  async update(
    @Body() request: UpdatePositionDto,
  ): Promise<PositionResponseDto> {
    return firstValueFrom(
      this.collaboratorsClientKafka.send(
        'collaborators.update.position',
        request,
      ),
    );
  }

  @Delete(':id')
  async remove(@Param('id') positionId: string): Promise<DeleteResultResponse> {
    return firstValueFrom(
      this.collaboratorsClientKafka.send('collaborators.remove.position', {
        positionId,
      }),
    );
  }
}
