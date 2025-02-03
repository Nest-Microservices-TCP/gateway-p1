import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { ROOMS_MICROSERVICE } from 'src/config';

import { ErrorInterceptor } from 'src/common/interceptors';

import { DeleteResultResponse } from 'src/common/dto/response';
import {
  CreateReservationStateDto,
  UpdateReservationStateDto,
} from './dto/request';
import { ReservationStateResponseDto } from './dto/response';

@Controller('reservations-states')
@UseInterceptors(ErrorInterceptor)
export class ReservationsStatesController {
  constructor(
    @Inject(ROOMS_MICROSERVICE)
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

  @Post()
  async save(
    @Body() request: CreateReservationStateDto,
  ): Promise<ReservationStateResponseDto> {
    return await firstValueFrom(
      this.roomsClient.send({ cmd: 'save.reservation.state' }, request),
    );
  }

  @Patch()
  async update(
    @Body() request: UpdateReservationStateDto,
  ): Promise<ReservationStateResponseDto> {
    return await firstValueFrom(
      this.roomsClient.send({ cmd: 'update.reservation.state' }, request),
    );
  }

  @Delete(':id')
  async remove(reservationStateId: string): Promise<DeleteResultResponse> {
    return await firstValueFrom(
      this.roomsClient.send(
        { cmd: 'remove.reservation.state' },
        { reservationStateId },
      ),
    );
  }
}
