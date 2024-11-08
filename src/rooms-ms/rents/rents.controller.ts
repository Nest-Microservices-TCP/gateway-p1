import { Body, Controller, Inject, Post } from '@nestjs/common';
import { RoomResponseDto } from '../rooms/dto/response';
import { CreateRoomDto } from '../rooms/dto/request';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ROOMS_MS } from 'src/config';

@Controller('rents')
export class RentsController {
  constructor(
    @Inject(ROOMS_MS)
    private roomsClient: ClientProxy,
  ) {}

  @Post()
  async save(@Body() request: CreateRoomDto): Promise<RoomResponseDto> {
    return firstValueFrom(this.roomsClient.send({ cmd: 'save.rent' }, request));
  }
}
