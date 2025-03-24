import { Controller, Inject, UseInterceptors } from '@nestjs/common';
import { ErrorInterceptor } from 'src/common/interceptors';

import { PositionsServiceClient } from 'src/grpc/proto/collaborators/positions.pb';

import { POSITIONS_GRPC_CLIENT } from 'src/grpc-clients/collaborators';

@Controller('positions')
@UseInterceptors(ErrorInterceptor)
export class PositionsController {
  constructor(
    @Inject(POSITIONS_GRPC_CLIENT)
    private readonly positionsGrpcClient: PositionsServiceClient,
  ) {}
}
