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
    this.roomsClientKafka.subscribeToResponseOf('reservations.find.all');
    this.roomsClientKafka.subscribeToResponseOf('reservations.find.one');
    this.roomsClientKafka.subscribeToResponseOf('reservations.save');
    this.roomsClientKafka.subscribeToResponseOf('reservations.update');
    this.roomsClientKafka.subscribeToResponseOf('reservations.remove');
  }

  @Get()
  async findAll(): Promise<ReservationResponseDto[]> {
    return await firstValueFrom(
      this.roomsClientKafka.send('reservations.find.all', {}),
    );
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) reservationId: string,
  ): Promise<ReservationResponseDto> {
    return await firstValueFrom(
      this.roomsClientKafka.send('reservations.find.one', {
        reservationId,
      }),
    );
  }

  @Post()
  async save(
    @Body() request: CreateReservationDto,
  ): Promise<ReservationResponseDto> {
    return await firstValueFrom(
      this.roomsClientKafka.send('reservations.save', request),
    );
  }

  @Patch()
  async update(
    @Body() request: UpdateReservationDto,
  ): Promise<ReservationResponseDto> {
    return await firstValueFrom(
      this.roomsClientKafka.send('reservations.update', request),
    );
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseUUIDPipe) reservationId: string,
  ): Promise<ReservationResponseDto> {
    return await firstValueFrom(
      this.roomsClientKafka.send('reservations.remove', { reservationId }),
    );
  }
}
