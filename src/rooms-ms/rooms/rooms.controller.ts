import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { ROOMS_MS } from 'src/config';
import { CreateRoomDto, UpdateRoomDto } from './dto/request';
import { RoomResponseDto } from './dto/response';

@Controller('rooms')
export class RoomsController {
  constructor(
    @Inject(ROOMS_MS)
    private readonly roomsClient: ClientProxy,
  ) {}

  @Post()
  async save(@Body() request: CreateRoomDto): Promise<RoomResponseDto> {
    return firstValueFrom(
      this.roomsClient.send({ cmd: 'save.room' }, request).pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      ),
    );
  }

  @Get()
  async findAll(): Promise<RoomResponseDto[]> {
    return firstValueFrom(
      this.roomsClient.send({ cmd: 'find.all.rooms' }, {}).pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      ),
    );
  }

  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<RoomResponseDto> {
    return firstValueFrom(
      this.roomsClient.send({ cmd: 'find.one.room.by.id' }, { id }).pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      ),
    );
  }

  @Patch()
  async update(@Body() request: UpdateRoomDto): Promise<RoomResponseDto> {
    return firstValueFrom(
      this.roomsClient.send({ cmd: 'update.room' }, request).pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      ),
    );
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<RoomResponseDto> {
    return firstValueFrom(
      this.roomsClient.send({ cmd: 'delete.room.by.id' }, { id }).pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      ),
    );
  }
}
