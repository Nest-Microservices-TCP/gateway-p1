import { Controller, Inject, UseInterceptors } from '@nestjs/common';
import { ErrorInterceptor } from 'src/common/interceptors';

import { AreasServiceClient } from 'src/grpc/proto/collaborators/areas.pb';

import { AREAS_GRPC_CLIENT } from 'src/grpc-clients/collaborators';

@Controller('areas')
@UseInterceptors(ErrorInterceptor)
export class AreasController {
  constructor(
    @Inject(AREAS_GRPC_CLIENT)
    private readonly areasGrpcClient: AreasServiceClient,
  ) {}
}
