import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ROOMS_MS } from 'src/config';
import { ReservationResponseDto } from './dto/response';
import { firstValueFrom } from 'rxjs';
import { CreateReservationDto } from './dto/request';

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

  @Post()
  async save(
    @Body() request: CreateReservationDto,
  ): Promise<ReservationResponseDto> {
    return await firstValueFrom(
      this.roomsClient.send({ cmd: 'save.reservation' }, request),
    );
  }

  @Get(':id')
  async findOneById(
    @Param('id') reservationId: string,
  ): Promise<ReservationResponseDto> {
    return await firstValueFrom(
      this.roomsClient.send(
        { cmd: 'find.one.reservation.by.id' },
        { reservationId },
      ),
    );
  }
}
