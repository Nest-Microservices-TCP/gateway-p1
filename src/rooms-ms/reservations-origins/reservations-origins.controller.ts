import {
  Body,
  Post,
  Inject,
  Controller,
  UseInterceptors,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ErrorInterceptor } from 'src/common/interceptors';

import { ReservationsOriginsServiceClient } from 'src/grpc/rooms/reservations_origins.pb';

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
}
