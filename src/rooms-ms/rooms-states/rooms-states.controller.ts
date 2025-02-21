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

import { ROOMS_CLIENT_KAFKA } from 'src/config';

import { ErrorInterceptor } from 'src/common/interceptors';

import { DeleteResultResponse } from 'src/common/dto/response';
import { CreateRoomStateDto, UpdateRoomStateDto } from './dto/request';
import { RoomStateResponseDto } from './dto/response';

@Controller('rooms-states')
@UseInterceptors(ErrorInterceptor)
export class RoomStatesController implements OnModuleInit {
  constructor(
    @Inject(ROOMS_CLIENT_KAFKA)
    private readonly roomsClientKafka: ClientKafka,
  ) {}

  onModuleInit() {
    this.roomsClientKafka.subscribeToResponseOf('roomsStates.save');
    this.roomsClientKafka.subscribeToResponseOf('roomsStates.find.one');
    this.roomsClientKafka.subscribeToResponseOf('roomsStates.find.all');
    this.roomsClientKafka.subscribeToResponseOf('roomsStates.update');
    this.roomsClientKafka.subscribeToResponseOf('roomsStates.remove');
  }

  @Post()
  async save(
    @Body() request: CreateRoomStateDto,
  ): Promise<RoomStateResponseDto> {
    return firstValueFrom(
      this.roomsClientKafka.send('roomsStates.save', request),
    );
  }

  @Get(':id')
  async findOne(
    @Param('id') roomStateId: string,
  ): Promise<RoomStateResponseDto> {
    return firstValueFrom(
      this.roomsClientKafka.send('roomsStates.find.one', { roomStateId }),
    );
  }

  @Get()
  async findAll(): Promise<RoomStateResponseDto[]> {
    return firstValueFrom(
      this.roomsClientKafka.send('roomsStates.find.all', {}),
    );
  }

  @Patch()
  async update(
    @Body() request: UpdateRoomStateDto,
  ): Promise<RoomStateResponseDto> {
    return firstValueFrom(
      this.roomsClientKafka.send('roomsStates.update', request),
    );
  }

  @Delete(':id')
  async remove(
    @Param('id') roomStateId: string,
  ): Promise<DeleteResultResponse> {
    return firstValueFrom(
      this.roomsClientKafka.send('roomsStates.remove', {
        roomStateId,
      }),
    );
  }
}
