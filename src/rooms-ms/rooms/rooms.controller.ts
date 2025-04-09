import { firstValueFrom } from 'rxjs';
import { Controller, Get, Inject, UseInterceptors } from '@nestjs/common';
import { ErrorInterceptor } from 'src/common/interceptors';

import { ROOMS_GRPC_CLIENT } from 'src/grpc-clients/rooms/rooms-grpc.provider';
import { Room, RoomsServiceClient } from 'src/grpc/proto-files/rooms/rooms.pb';

@Controller('rooms')
@UseInterceptors(ErrorInterceptor)
export class RoomsController {
  constructor(
    @Inject(ROOMS_GRPC_CLIENT)
    private readonly roomsGrpcClient: RoomsServiceClient,
  ) {}

  @Get()
  async findAll(): Promise<Room[]> {
    const { rooms } = await firstValueFrom(this.roomsGrpcClient.find({}));

    return rooms;
  }
}
