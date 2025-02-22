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
    this.collaboratorsClientKafka.subscribeToResponseOf('areas.find.all');
    this.collaboratorsClientKafka.subscribeToResponseOf('areas.find.one');
    this.collaboratorsClientKafka.subscribeToResponseOf('areas.save');
    this.collaboratorsClientKafka.subscribeToResponseOf('areas.update');
    this.collaboratorsClientKafka.subscribeToResponseOf('areas.remove');
  }

  @Post()
  async save(@Body() request: CreateAreaDto): Promise<AreaResponseDto> {
    return firstValueFrom(
      this.collaboratorsClientKafka.send('areas.save', request),
    );
  }

  @Get()
  async findAll(): Promise<AreaResponseDto[]> {
    return firstValueFrom(
      this.collaboratorsClientKafka.send('areas.find.all', {}),
    );
  }

  @Get(':id')
  async findOne(@Param('id') areaId: string): Promise<AreaResponseDto> {
    return firstValueFrom(
      this.collaboratorsClientKafka.send('areas.find.one', {
        areaId,
      }),
    );
  }

  @Patch()
  async update(@Body() request: UpdateAreaDto): Promise<AreaResponseDto> {
    return firstValueFrom(
      this.collaboratorsClientKafka.send('areas.update', request),
    );
  }

  @Delete(':id')
  async remove(@Param('id') areaId: string): Promise<DeleteResultResponse> {
    return firstValueFrom(
      this.collaboratorsClientKafka.send('areas.remove', {
        areaId,
      }),
    );
  }
}
