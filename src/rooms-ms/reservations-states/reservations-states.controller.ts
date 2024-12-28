import { ReservationStateResponseDto } from './dto/response';
import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ROOMS_MS } from 'src/config';
import { firstValueFrom } from 'rxjs';

@Controller('reservations-states')
export class ReservationsStatesController {
  constructor(
    @Inject(ROOMS_MS)
    private readonly roomsClient: ClientProxy,
  ) {}

  async findAll(): Promise<ReservationStateResponseDto[]> {
    return await firstValueFrom(
      this.roomsClient.send({ cmd: 'find.all.reservations.states' }, {}),
    );
  }
}
