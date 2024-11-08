import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ROOMS_MS } from 'src/config';

@Controller('rents')
export class RentsController {
  constructor(
    @Inject(ROOMS_MS)
    private roomsClient: ClientProxy,
  ) {}
}
