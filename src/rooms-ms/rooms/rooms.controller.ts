import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ROOMS_MS } from 'src/config';

@Controller('rooms')
export class RoomsController {
  constructor(
    @Inject(ROOMS_MS)
    private readonly roomsClient: ClientProxy,
  ) {}

  @Get()
  async getHello() {
    return await firstValueFrom(
      this.roomsClient.send({ cmd: 'get.hello' }, {}),
    );
  }
}
