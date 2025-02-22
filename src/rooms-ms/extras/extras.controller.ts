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
    this.roomsClientKafka.subscribeToResponseOf('extras.find.all');
    this.roomsClientKafka.subscribeToResponseOf('extras.find.one');
    this.roomsClientKafka.subscribeToResponseOf('extras.save');
    this.roomsClientKafka.subscribeToResponseOf('extras.update');
    this.roomsClientKafka.subscribeToResponseOf('extras.remove');
  }

  @Get()
  async findAll(): Promise<ExtraResponseDto[]> {
    return await firstValueFrom(
      this.roomsClientKafka.send('extras.find.all', {}),
    );
  }

  @Get(':id')
  async findOne(@Param('id') extraId: string): Promise<ExtraResponseDto> {
    return await firstValueFrom(
      this.roomsClientKafka.send('extras.find.one', { extraId }),
    );
  }

  @Post()
  async save(@Body() request: CreateExtraDto): Promise<ExtraResponseDto> {
    return await firstValueFrom(
      this.roomsClientKafka.send('extras.save', request),
    );
  }

  @Patch()
  async update(@Body() request: UpdateExtraDto): Promise<ExtraResponseDto> {
    return await firstValueFrom(
      this.roomsClientKafka.send('extras.update', request),
    );
  }

  @Delete(':id')
  async remove(@Param('id') extraId: string): Promise<DeleteResultResponse> {
    return await firstValueFrom(
      this.roomsClientKafka.send('extras.remove', { extraId }),
    );
  }
}
