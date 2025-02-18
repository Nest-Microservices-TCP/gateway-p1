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
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { ROOMS_CLIENT_KAFKA } from 'src/config';

import { ErrorInterceptor } from 'src/common/interceptors';

import { DeleteResultResponse } from 'src/common/dto/response';
import { CreateExtraDto, UpdateExtraDto } from './dto/request';
import { ExtraResponseDto } from './dto/response';

@Controller('extras')
@UseInterceptors(ErrorInterceptor)
export class ExtrasController {
  constructor(
    @Inject(ROOMS_CLIENT_KAFKA)
    private readonly roomsClientKafka: ClientKafka,
  ) {}

  async onModuleInit() {
    this.roomsClientKafka.subscribeToResponseOf('rooms.find.all.extras');
    this.roomsClientKafka.subscribeToResponseOf('rooms.find.one.extra');
    this.roomsClientKafka.subscribeToResponseOf('rooms.save.extra');
    this.roomsClientKafka.subscribeToResponseOf('rooms.update.extra');
    this.roomsClientKafka.subscribeToResponseOf('rooms.remove.extra');
  }

  @Get()
  async findAll(): Promise<ExtraResponseDto[]> {
    return await firstValueFrom(
      this.roomsClientKafka.send('rooms.find.all.extras', {}),
    );
  }

  @Get(':id')
  async findOne(@Param('id') extraId: string): Promise<ExtraResponseDto> {
    return await firstValueFrom(
      this.roomsClientKafka.send('rooms.find.one.extra', { extraId }),
    );
  }

  @Post()
  async save(@Body() request: CreateExtraDto): Promise<ExtraResponseDto> {
    return await firstValueFrom(
      this.roomsClientKafka.send('rooms.save.extra', request),
    );
  }

  @Patch()
  async update(@Body() request: UpdateExtraDto): Promise<ExtraResponseDto> {
    return await firstValueFrom(
      this.roomsClientKafka.send('rooms.update.extra', request),
    );
  }

  @Delete(':id')
  async remove(@Param('id') extraId: string): Promise<DeleteResultResponse> {
    return await firstValueFrom(
      this.roomsClientKafka.send('rooms.remove.extra', { extraId }),
    );
  }
}
