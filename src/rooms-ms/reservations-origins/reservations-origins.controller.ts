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

import { DeleteResultResponse } from 'src/common/dto/response';
import {
  CreateReservationOriginDto,
  UpdateReservationOriginDto,
} from './dto/request';
import { ReservationOriginResponseDto } from './dto/response';

@Controller('reservations-origins')
@UseInterceptors(ErrorInterceptor)
export class ReservationsOriginsController {
  constructor(
    @Inject(ROOMS_CLIENT_KAFKA)
    private readonly roomsClientKafka: ClientKafka,
  ) {}

  async onModuleInit() {
    this.roomsClientKafka.subscribeToResponseOf(
      'rooms.find.all.reservationsOrigins',
    );
    this.roomsClientKafka.subscribeToResponseOf(
      'rooms.find.one.reservationOrigin',
    );
    this.roomsClientKafka.subscribeToResponseOf('rooms.save.reservationOrigin');
    this.roomsClientKafka.subscribeToResponseOf('rooms.save.reservationOrigin');
    this.roomsClientKafka.subscribeToResponseOf(
      'rooms.update.reservationOrigin',
    );
    this.roomsClientKafka.subscribeToResponseOf(
      'rooms.remove.reservationOrigin',
    );
  }

  @Get()
  async findAll(): Promise<ReservationOriginResponseDto[]> {
    return await firstValueFrom(
      this.roomsClientKafka.send('rooms.find.all.reservationsOrigins', {}),
    );
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) reservationOriginId: string,
  ): Promise<ReservationOriginResponseDto> {
    return await firstValueFrom(
      this.roomsClientKafka.send('rooms.find.one.reservationOrigin', {
        reservationOriginId,
      }),
    );
  }

  @Post()
  async save(
    @Body() request: CreateReservationOriginDto,
  ): Promise<ReservationOriginResponseDto> {
    return await firstValueFrom(
      this.roomsClientKafka.send('rooms.save.reservationOrigin', request),
    );
  }

  @Patch()
  async update(
    @Body() request: UpdateReservationOriginDto,
  ): Promise<ReservationOriginResponseDto> {
    return await firstValueFrom(
      this.roomsClientKafka.send('rooms.update.reservationOrigin', request),
    );
  }

  @Delete()
  async remove(
    @Param('id', ParseUUIDPipe) reservationOriginId: string,
  ): Promise<DeleteResultResponse> {
    return await firstValueFrom(
      this.roomsClientKafka.send('rooms.remove.reservationOrigin', {
        reservationOriginId,
      }),
    );
  }
}
