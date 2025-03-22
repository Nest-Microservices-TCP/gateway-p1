import { Controller, Inject, UseInterceptors } from '@nestjs/common';

import { ErrorInterceptor } from 'src/common/interceptors';

import { RoomsStatesServiceClient } from 'src/grpc/proto/rooms/rooms_states.pb';

import { ROOMS_STATES_GRPC_CLIENT } from 'src/grpc-clients/rooms';

@Controller('rooms-states')
@UseInterceptors(ErrorInterceptor)
export class RoomStatesController {
  constructor(
    @Inject(ROOMS_STATES_GRPC_CLIENT)
    private readonly roomsStatesGrpcClient: RoomsStatesServiceClient,
  ) {}
  }
}
