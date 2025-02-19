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
import { CreateAreaDto, UpdateAreaDto } from './dto/request';
import { AreaResponseDto } from './dto/response';

@Controller('areas')
@UseInterceptors(ErrorInterceptor)
export class AreasController implements OnModuleInit {
  constructor(
    @Inject(COLLABORATORS_KAFKA_CLIENT)
    private readonly collaboratorsClientKafka: ClientKafka,
  ) {}

  onModuleInit() {
    this.collaboratorsClientKafka.subscribeToResponseOf(
      'collaborators.save.area',
    );
    this.collaboratorsClientKafka.subscribeToResponseOf(
      'collaborators.find.all.areas',
    );
    this.collaboratorsClientKafka.subscribeToResponseOf(
      'collaborators.find.one.area',
    );
    this.collaboratorsClientKafka.subscribeToResponseOf(
      'collaborators.update.area',
    );
    this.collaboratorsClientKafka.subscribeToResponseOf(
      'collaborators.remove.area',
    );
  }

  @Post()
  async save(@Body() request: CreateAreaDto): Promise<AreaResponseDto> {
    return firstValueFrom(
      this.collaboratorsClientKafka.send('collaborators.save.area', request),
    );
  }

  @Get()
  async findAll(): Promise<AreaResponseDto[]> {
    return firstValueFrom(
      this.collaboratorsClientKafka.send('collaborators.find.all.areas', {}),
    );
  }

  @Get(':id')
  async findOne(@Param('id') areaId: string): Promise<AreaResponseDto> {
    return firstValueFrom(
      this.collaboratorsClientKafka.send('collaborators.find.one.area', {
        areaId,
      }),
    );
  }

  @Patch()
  async update(@Body() request: UpdateAreaDto): Promise<AreaResponseDto> {
    return firstValueFrom(
      this.collaboratorsClientKafka.send('collaborators.update.area', request),
    );
  }

  @Delete(':id')
  async remove(@Param('id') areaId: string): Promise<DeleteResultResponse> {
    return firstValueFrom(
      this.collaboratorsClientKafka.send('collaborators.remove.area', {
        areaId,
      }),
    );
  }
}
