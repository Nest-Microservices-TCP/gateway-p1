import { firstValueFrom } from 'rxjs';
import { Controller, Get, Inject, UseInterceptors } from '@nestjs/common';

import { ErrorInterceptor } from 'src/common/interceptors';

import { Extra, ExtrasServiceClient } from 'src/grpc/proto/rooms/extras.pb';

import { EXTRAS_GRPC_CLIENT } from 'src/grpc-clients/rooms/extras-grpc.provider';

@Controller('extras')
@UseInterceptors(ErrorInterceptor)
export class ExtrasController {
  constructor(
    @Inject(EXTRAS_GRPC_CLIENT)
    private readonly extrasGrpcClient: ExtrasServiceClient,
  ) {}

  @Get()
  async findAll(): Promise<Extra[]> {
    const { extras } = await firstValueFrom(
      this.extrasGrpcClient.listExtras({}),
    );

    return extras;
  }
}
