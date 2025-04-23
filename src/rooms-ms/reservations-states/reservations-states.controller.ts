import {
  Get,
  Post,
  Body,
  Param,
  Inject,
  Controller,
  ParseUUIDPipe,
  UseInterceptors,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ErrorInterceptor } from 'src/common/interceptors';

import {
  ReservationState,
  ReservationsStatesServiceClient,
} from 'src/grpc/rooms/reservations_states.pb';

import { RESERVATIONS_STATES_GRPC_CLIENT } from 'src/grpc-clients/rooms';

import {
  CreateReservationStateDto,
  FindReservationsStatesByIdsDto,
} from './dto/request';

@Controller('reservations-states')
@UseInterceptors(ErrorInterceptor)
export class ReservationsStatesController {
  constructor(
    @Inject(RESERVATIONS_STATES_GRPC_CLIENT)
    private readonly reservationsStatesGrpcClient: ReservationsStatesServiceClient,
  ) {}

  @Post()
  async save(@Body() request: CreateReservationStateDto): Promise<void> {
    await firstValueFrom(this.reservationsStatesGrpcClient.save(request));
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) reservation_state_id: string,
  ): Promise<ReservationState> {
    return firstValueFrom(
      this.reservationsStatesGrpcClient.findOne({ reservation_state_id }),
    );
  }

  @Get()
  async find(): Promise<ReservationState[]> {
    const { reservations_states } = await firstValueFrom(
      this.reservationsStatesGrpcClient.find({}),
    );

    return reservations_states;
  }

  @Get('find-by-ids')
  async findByIds(
    @Body() request: FindReservationsStatesByIdsDto,
  ): Promise<ReservationState[]> {
    const { reservations_states } = await firstValueFrom(
      this.reservationsStatesGrpcClient.findByIds(request),
    );

    return reservations_states;
  }
}
