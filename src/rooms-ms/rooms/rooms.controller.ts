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

import { ROOMS_MICROSERVICE } from 'src/config';

import { ErrorInterceptor } from 'src/common/interceptors';

import { DeleteResultResponse } from 'src/common/dto/response';
import { CreateRoomDto, UpdateRoomDto } from './dto/request';
import { RoomResponseDto } from './dto/response';

@Controller('rooms')
@UseInterceptors(ErrorInterceptor)
export class RoomsController {
  constructor(
    @Inject(ROOMS_MICROSERVICE)
    private readonly roomsClient: ClientProxy,
  ) {}

  @Post()
  async save(@Body() request: CreateRoomDto): Promise<RoomResponseDto> {
    return firstValueFrom(this.roomsClient.send({ cmd: 'save.room' }, request));
  }

  @Get()
  async findAll(): Promise<RoomResponseDto[]> {
    return firstValueFrom(this.roomsClient.send({ cmd: 'find.all.rooms' }, {}));
  }

  @Get(':id')
  async findOne(@Param('id') roomId: string): Promise<RoomResponseDto> {
    return firstValueFrom(
      this.roomsClient.send({ cmd: 'find.one.room' }, { roomId }),
    );
  }

  @Patch()
  async update(@Body() request: UpdateRoomDto): Promise<RoomResponseDto> {
    return firstValueFrom(
      this.roomsClient.send({ cmd: 'update.room' }, request),
    );
  }

  @Delete(':id')
  async remove(@Param('id') roomId: string): Promise<DeleteResultResponse> {
    return firstValueFrom(
      this.roomsClient.send({ cmd: 'remove.room.by.id' }, { roomId }),
    );
  }
}
