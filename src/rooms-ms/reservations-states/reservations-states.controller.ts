import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ReservationStateResponseDto } from './dto/response';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ROOMS_MS } from 'src/config';

@Controller('reservations-states')
export class ReservationsStatesController {
  constructor(
    @Inject(ROOMS_MS)
    private readonly roomsClient: ClientProxy,
  ) {}

  @Get()
  async findAll(): Promise<ReservationStateResponseDto[]> {
    return await firstValueFrom(
      this.roomsClient.send({ cmd: 'find.all.reservations.states' }, {}),
    );
  }

  @Get(':id')
  async findOne(
    @Param('id') reservationStateId: string,
  ): Promise<ReservationStateResponseDto> {
    return await firstValueFrom(
      this.roomsClient.send(
        { cmd: 'find.one.reservation.state' },
        { reservationStateId },
      ),
    );
  }
}
