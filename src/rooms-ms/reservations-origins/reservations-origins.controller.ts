import { Controller, Get, Inject, Param, ParseUUIDPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { firstValueFrom } from 'rxjs';

import { ROOMS_MS } from 'src/config';

import { ReservationOriginResponseDto } from './dto/response';

@Controller('reservations-origins')
export class ReservationsOriginsController {
  constructor(
    @Inject(ROOMS_MS)
    private readonly roomsClient: ClientProxy,
  ) {}

  @Get()
  async findAll(): Promise<ReservationOriginResponseDto[]> {
    return await firstValueFrom(
      this.roomsClient.send({ cmd: 'find.all.reservations.origins' }, {}),
    );
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) reservationOriginId: string,
  ): Promise<ReservationOriginResponseDto> {
    return await firstValueFrom(
      this.roomsClient.send(
        { cmd: 'find.one.reservation.origin' },
        { reservationOriginId },
      ),
    );
  }
}
