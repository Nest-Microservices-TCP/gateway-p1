import {
  Body,
  Post,
  Inject,
  Controller,
  UseInterceptors,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ErrorInterceptor } from 'src/common/interceptors';

import { RoomsStatesServiceClient } from 'src/grpc/proto/rooms/rooms_states.pb';

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
}
