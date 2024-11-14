import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ROOMS_MS } from 'src/config';

@Controller('extras')
export class ExtrasController {
  constructor(
    @Inject(ROOMS_MS)
    private readonly roomsClient: ClientProxy,
  ) {}
}
