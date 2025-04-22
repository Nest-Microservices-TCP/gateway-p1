import {
  Get,
  Body,
  Post,
  Param,
  Inject,
  Controller,
  ParseUUIDPipe,
  UseInterceptors,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ErrorInterceptor } from 'src/common/interceptors';

import {
  ReservationOrigin,
  ReservationsOriginsServiceClient,
} from 'src/grpc/rooms/reservations_origins.pb';

import { RESERVATIONS_ORIGINS_GRPC_CLIENT } from 'src/grpc-clients/rooms';

import { CreateReservationOriginDto } from './dto/request';

@Controller('reservations-origins')
@UseInterceptors(ErrorInterceptor)
export class ReservationsOriginsController {
  constructor(
    @Inject(RESERVATIONS_ORIGINS_GRPC_CLIENT)
    private readonly reservationsOriginsGrpcClient: ReservationsOriginsServiceClient,
  ) {}

  @Post()
  async save(@Body() request: CreateReservationOriginDto): Promise<void> {
    await firstValueFrom(this.reservationsOriginsGrpcClient.save(request));
  }

  @Get()
  async findAll(): Promise<ReservationOrigin[]> {
    const { reservations_origins } = await firstValueFrom(
      this.reservationsOriginsGrpcClient.find({}),
    );

    return reservations_origins;
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) reservation_origin_id: string,
  ): Promise<ReservationOrigin> {
    return firstValueFrom(
      this.reservationsOriginsGrpcClient.findOne({ reservation_origin_id }),
    );
  }
}
