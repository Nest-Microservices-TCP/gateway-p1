import { ClientProxy } from '@nestjs/microservices';
import { Controller, Inject } from '@nestjs/common';
import { ROOMS_MS } from 'src/config';

@Controller('rates')
export class RatesController {
  constructor(
    @Inject(ROOMS_MS)
    private readonly roomsClient: ClientProxy,
  ) {}
}
