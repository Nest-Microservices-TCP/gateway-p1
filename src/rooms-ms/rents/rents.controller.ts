import { ClientProxy } from '@nestjs/microservices';
import { Controller, Inject, UseInterceptors } from '@nestjs/common';
import { ErrorInterceptor } from 'src/common/interceptors';

import { RENTS_RMQ_CLIENT } from 'src/rmq-clients/rooms/rooms-rmq.provider';

@Controller('rents')
@UseInterceptors(ErrorInterceptor)
export class RentsController {
  constructor(
    @Inject(RENTS_RMQ_CLIENT)
    private readonly roomsRmqClient: ClientProxy,
  ) {}
}
