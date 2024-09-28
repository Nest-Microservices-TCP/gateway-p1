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
import { ROOMS_MS } from 'src/config';
import { CreateRoomDto, UpdateRoomDto } from './dto/request';
import { RoomResponseDto } from './dto/response';
import { ErrorInterceptor } from 'src/common/interceptors';

@Controller('rooms')
@UseInterceptors(ErrorInterceptor)
export class RoomsController {
  constructor(
    @Inject(ROOMS_MS)
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
  async findOneById(@Param('id') id: string): Promise<RoomResponseDto> {
    return firstValueFrom(
      this.roomsClient.send({ cmd: 'find.one.room.by.id' }, { id }),
    );
  }

  @Patch()
  async update(@Body() request: UpdateRoomDto): Promise<RoomResponseDto> {
    return firstValueFrom(
      this.roomsClient.send({ cmd: 'update.room' }, request),
    );
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<RoomResponseDto> {
    return firstValueFrom(
      this.roomsClient.send({ cmd: 'delete.room.by.id' }, { id }),
    );
  }
}
