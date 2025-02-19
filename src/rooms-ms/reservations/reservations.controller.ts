import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { ROOMS_CLIENT_KAFKA } from 'src/config';

import { ErrorInterceptor } from 'src/common/interceptors';

import { CreateReservationDto, UpdateReservationDto } from './dto/request';
import { ReservationResponseDto } from './dto/response';

@Controller('reservations')
@UseInterceptors(ErrorInterceptor)
export class ReservationsController {
  constructor(
    @Inject(ROOMS_CLIENT_KAFKA)
    private readonly roomsClientKafka: ClientKafka,
  ) {}

  async onModuleInit() {
    this.roomsClientKafka.subscribeToResponseOf('rooms.find.all.reservations');
    this.roomsClientKafka.subscribeToResponseOf('rooms.find.one.reservation');
    this.roomsClientKafka.subscribeToResponseOf('rooms.save.reservation');
    this.roomsClientKafka.subscribeToResponseOf('rooms.update.reservation');
    this.roomsClientKafka.subscribeToResponseOf('rooms.remove.reservation');
  }

  @Get()
  async findAll(): Promise<ReservationResponseDto[]> {
    return await firstValueFrom(
      this.roomsClientKafka.send('rooms.find.all.reservations', {}),
    );
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) reservationId: string,
  ): Promise<ReservationResponseDto> {
    return await firstValueFrom(
      this.roomsClientKafka.send('rooms.find.one.reservation', {
        reservationId,
      }),
    );
  }

  @Post()
  async save(
    @Body() request: CreateReservationDto,
  ): Promise<ReservationResponseDto> {
    return await firstValueFrom(
      this.roomsClientKafka.send('rooms.save.reservation', request),
    );
  }

  @Patch()
  async update(
    @Body() request: UpdateReservationDto,
  ): Promise<ReservationResponseDto> {
    return await firstValueFrom(
      this.roomsClientKafka.send('rooms.update.reservation', request),
    );
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseUUIDPipe) reservationId: string,
  ): Promise<ReservationResponseDto> {
    return await firstValueFrom(
      this.roomsClientKafka.send('rooms.remove.reservation', { reservationId }),
    );
  }
}
