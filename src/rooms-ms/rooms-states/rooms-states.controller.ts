import {
  Get,
  Body,
  Post,
  Param,
  Inject,
  Controller,
  ParseUUIDPipe,
  UseInterceptors,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ErrorInterceptor } from 'src/common/interceptors';

import {
  RoomState,
  RoomsStatesServiceClient,
} from 'src/grpc/rooms/rooms_states.pb';

import { ROOMS_STATES_GRPC_CLIENT } from 'src/grpc-clients/rooms';

import { CreateRoomStateDto } from './dto/request';

@Controller('rooms-states')
@UseInterceptors(ErrorInterceptor)
export class RoomStatesController {
  constructor(
    @Inject(ROOMS_STATES_GRPC_CLIENT)
    private readonly roomsStatesGrpcClient: RoomsStatesServiceClient,
  ) {}

  @Post()
  async save(@Body() request: CreateRoomStateDto): Promise<void> {
    await firstValueFrom(this.roomsStatesGrpcClient.save(request));
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) room_state_id: string,
  ): Promise<RoomState> {
    return firstValueFrom(
      this.roomsStatesGrpcClient.findOne({ room_state_id }),
    );
  }

  @Get()
  async find(): Promise<RoomState[]> {
    const { rooms_states } = await firstValueFrom(
      this.roomsStatesGrpcClient.find({}),
    );

    return rooms_states;
  }
}
