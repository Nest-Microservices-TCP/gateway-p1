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
import { CreateRoomDto, UpdateRoomDto } from './dto/request';
import { RoomResponseDto } from './dto/response';

@Controller('rooms')
@UseInterceptors(ErrorInterceptor)
export class RoomsController implements OnModuleInit {
  constructor(
    @Inject(ROOMS_CLIENT_KAFKA)
    private readonly roomsClientKafka: ClientKafka,
  ) {}

  onModuleInit() {
    this.roomsClientKafka.subscribeToResponseOf('rooms.save');
    this.roomsClientKafka.subscribeToResponseOf('rooms.find.all');
    this.roomsClientKafka.subscribeToResponseOf('rooms.find.on');
    this.roomsClientKafka.subscribeToResponseOf('rooms.update');
    this.roomsClientKafka.subscribeToResponseOf('rooms.remove');
  }

  @Post()
  async save(@Body() request: CreateRoomDto): Promise<RoomResponseDto> {
    return firstValueFrom(this.roomsClientKafka.send('rooms.save', request));
  }

  @Get()
  async findAll(): Promise<RoomResponseDto[]> {
    return firstValueFrom(this.roomsClientKafka.send('rooms.find.all', {}));
  }

  @Get(':id')
  async findOne(@Param('id') roomId: string): Promise<RoomResponseDto> {
    return firstValueFrom(
      this.roomsClientKafka.send('rooms.find.one', { roomId }),
    );
  }

  @Patch()
  async update(@Body() request: UpdateRoomDto): Promise<RoomResponseDto> {
    return firstValueFrom(this.roomsClientKafka.send('rooms.update', request));
  }

  @Delete(':id')
  async remove(@Param('id') roomId: string): Promise<DeleteResultResponse> {
    return firstValueFrom(
      this.roomsClientKafka.send('rooms.remove', { roomId }),
    );
  }
}
