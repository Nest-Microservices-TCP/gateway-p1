import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ROOMS_MS } from 'src/config';
import { ReservationResponseDto } from './dto/response';
import { firstValueFrom } from 'rxjs';
import { CreateReservationDto, UpdateReservationDto } from './dto/request';

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

  @Post()
  async save(
    @Body() request: CreateReservationDto,
  ): Promise<ReservationResponseDto> {
    return await firstValueFrom(
      this.roomsClient.send({ cmd: 'save.reservation' }, request),
    );
  }

  @Patch()
  async update(
    @Body() request: UpdateReservationDto,
  ): Promise<ReservationResponseDto> {
    return await firstValueFrom(
      this.roomsClient.send({ cmd: 'update.reservation' }, request),
    );
  }

  @Delete(':id')
  async remove(
    @Param('id') reservationId: string,
  ): Promise<ReservationResponseDto> {
    return await firstValueFrom(
      this.roomsClient.send({ cmd: 'remove.reservation' }, { reservationId }),
    );
  }
}
