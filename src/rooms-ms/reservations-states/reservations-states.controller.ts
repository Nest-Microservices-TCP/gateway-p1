import { firstValueFrom } from 'rxjs';
import { Controller, Inject, Post, UseInterceptors } from '@nestjs/common';
import { ErrorInterceptor } from 'src/common/interceptors';

import { ReservationsStatesServiceClient } from 'src/grpc/proto/rooms/reservations_states.pb';

import { RESERVATIONS_STATES_GRPC_CLIENT } from 'src/grpc-clients/rooms';

import { CreateReservationStateDto } from './dto/request';

@Controller('reservations-states')
@UseInterceptors(ErrorInterceptor)
export class ReservationsStatesController {
  constructor(
    @Inject(RESERVATIONS_STATES_GRPC_CLIENT)
    private readonly reservationsStatesGrpcClient: ReservationsStatesServiceClient,
  ) {}

  @Post()
  async save(request: CreateReservationStateDto): Promise<void> {
    await firstValueFrom(this.reservationsStatesGrpcClient.save(request));
  }
}
