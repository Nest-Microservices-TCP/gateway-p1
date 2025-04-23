import {
  Get,
  Post,
  Param,
  Inject,
  Controller,
  UseInterceptors,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ErrorInterceptor } from 'src/common/interceptors';

import {
  ReservationState,
  ReservationsStatesServiceClient,
} from 'src/grpc/rooms/reservations_states.pb';

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

  @Get(':id')
  async findOne(
    @Param('id') reservation_state_id: string,
  ): Promise<ReservationState> {
    return firstValueFrom(
      this.reservationsStatesGrpcClient.findOne({ reservation_state_id }),
    );
  }

  @Get('find-by-ids')
  async find(): Promise<ReservationState[]> {
    const { reservations_states } = await firstValueFrom(
      this.reservationsStatesGrpcClient.find({}),
    );

    return reservations_states;
  }
}
