import { DeleteResultResponse } from 'src/common/dto/response';
import { ReservationStateResponseDto } from './dto/response';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ROOMS_MS } from 'src/config';
import {
  CreateReservationStateDto,
  UpdateReservationStateDto,
} from './dto/request';
import {
  Get,
  Body,
  Post,
  Param,
  Patch,
  Inject,
  Delete,
  Controller,
} from '@nestjs/common';

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
