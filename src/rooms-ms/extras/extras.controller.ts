import { Controller, Inject, UseInterceptors } from '@nestjs/common';

import { ErrorInterceptor } from 'src/common/interceptors';

import { ExtrasServiceClient } from 'src/grpc/proto/rooms/extras.pb';

import { EXTRAS_GRPC_CLIENT } from 'src/grpc-clients/rooms/extras-grpc.provider';

@Controller('extras')
@UseInterceptors(ErrorInterceptor)
export class ExtrasController {
  constructor(
    @Inject(EXTRAS_GRPC_CLIENT)
    private readonly extrasGrpcClient: ExtrasServiceClient,
  ) {}
}
