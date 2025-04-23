import {
  Get,
  Post,
  Body,
  Inject,
  Controller,
  UseInterceptors,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ErrorInterceptor } from 'src/common/interceptors';

import { Room, RoomsServiceClient } from 'src/grpc/rooms/rooms.pb';

import { ROOMS_GRPC_CLIENT } from 'src/grpc-clients/rooms/rooms-grpc.provider';

import { CreateRoomDto } from './dto/request';

@Controller('rooms')
@UseInterceptors(ErrorInterceptor)
export class RoomsController {
  constructor(
    @Inject(ROOMS_GRPC_CLIENT)
    private readonly roomsGrpcClient: RoomsServiceClient,
  ) {}

  @Post()
  async save(@Body() request: CreateRoomDto): Promise<void> {
    firstValueFrom(this.roomsGrpcClient.save(request));
  }

  @Get()
  async findAll(): Promise<Room[]> {
    const { rooms } = await firstValueFrom(this.roomsGrpcClient.find({}));

    return rooms;
  }
}
