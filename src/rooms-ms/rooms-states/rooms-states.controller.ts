import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { ROOMS_MS } from 'src/config';
import { CreateRoomStateDto } from './dto/create-room-state.dto';

@Controller('rooms-states')
export class RoomStatesController {
  constructor(
    @Inject(ROOMS_MS)
    private readonly roomsClient: ClientProxy,
  ) {}

  @Post()
  async save(@Body() request: CreateRoomStateDto) {
    return firstValueFrom(
      this.roomsClient.send({ cmd: 'save.room.state' }, request).pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      ),
    );
  }
}
