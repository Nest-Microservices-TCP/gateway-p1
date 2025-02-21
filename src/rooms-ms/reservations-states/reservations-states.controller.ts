import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  OnModuleInit,
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
  CreateReservationStateDto,
  UpdateReservationStateDto,
} from './dto/request';
import { ReservationStateResponseDto } from './dto/response';

@Controller('reservations-states')
@UseInterceptors(ErrorInterceptor)
export class ReservationsStatesController implements OnModuleInit {
  constructor(
    @Inject(ROOMS_CLIENT_KAFKA)
    private readonly roomsClientKafka: ClientKafka,
  ) {}

  onModuleInit() {
    this.roomsClientKafka.subscribeToResponseOf('reservationsStates.find.all');
    this.roomsClientKafka.subscribeToResponseOf('reservationsStates.find.one');
    this.roomsClientKafka.subscribeToResponseOf('reservationsStates.save');
    this.roomsClientKafka.subscribeToResponseOf('reservationsStates.update');
    this.roomsClientKafka.subscribeToResponseOf('reservationsStates.remove');
  }

  @Get()
  async findAll(): Promise<ReservationStateResponseDto[]> {
    return await firstValueFrom(
      this.roomsClientKafka.send('reservationsStates.find.all', {}),
    );
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) reservationStateId: string,
  ): Promise<ReservationStateResponseDto> {
    return await firstValueFrom(
      this.roomsClientKafka.send('reservationsStates.find.one', {
        reservationStateId,
      }),
    );
  }

  @Post()
  async save(
    @Body() request: CreateReservationStateDto,
  ): Promise<ReservationStateResponseDto> {
    return await firstValueFrom(
      this.roomsClientKafka.send('reservationsStates.save', request),
    );
  }

  @Patch()
  async update(
    @Body() request: UpdateReservationStateDto,
  ): Promise<ReservationStateResponseDto> {
    return await firstValueFrom(
      this.roomsClientKafka.send('reservationsStates.update', request),
    );
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseUUIDPipe) reservationStateId: string,
  ): Promise<DeleteResultResponse> {
    return await firstValueFrom(
      this.roomsClientKafka.send('reservationsStates.remove', {
        reservationStateId,
      }),
    );
  }
}
