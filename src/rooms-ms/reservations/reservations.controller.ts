import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ROOMS_MS } from 'src/config';
import { ReservationResponseDto } from './dto/response';
import { firstValueFrom } from 'rxjs';

@Controller('reservations')
export class ReservationsController {
  constructor(
    @Inject(ROOMS_MS)
    private readonly roomsClient: ClientProxy,
  ) {}

  @Get()
  async findAll(): Promise<ReservationResponseDto[]> {
    return await firstValueFrom(
      this.roomsClient.send({ cmd: 'find.all.reservations' }, {}),
    );
  }
}
