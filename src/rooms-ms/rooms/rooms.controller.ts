import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
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
      this.roomsClient
        .send({ cmd: 'get.hello' }, { name: 'sucia', description: 'test' })
        .pipe(
          catchError((error) => {
            throw new RpcException(error);
          }),
        ),
    );
  }
}
