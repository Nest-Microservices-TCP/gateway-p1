import { Controller, Inject, UseInterceptors } from '@nestjs/common';
import { ErrorInterceptor } from 'src/common/interceptors';

import { CollaboratorsServiceClient } from 'src/grpc/proto/collaborators/collaborators.pb';

import { COLLABORATORS_GRPC_CLIENT } from 'src/grpc-clients/collaborators';

@Controller('collaborators')
@UseInterceptors(ErrorInterceptor)
export class CollaboratorsController {
  constructor(
    @Inject(COLLABORATORS_GRPC_CLIENT)
    private readonly collaboratorsGrpcClient: CollaboratorsServiceClient,
  ) {}
}
