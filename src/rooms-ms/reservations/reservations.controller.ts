import { CreateReservationDto, UpdateReservationDto } from './dto/request';
import { ErrorInterceptor } from 'src/common/interceptors';
import { ReservationResponseDto } from './dto/response';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ROOMS_MS } from 'src/config';
import {
  Get,
  Body,
  Post,
  Patch,
  Param,
  Delete,
  Inject,
  Controller,
  UseInterceptors,
} from '@nestjs/common';

@Controller('reservations')
@UseInterceptors(ErrorInterceptor)
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
