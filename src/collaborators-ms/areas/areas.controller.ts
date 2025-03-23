import {
  Body,
  Post,
  Inject,
  Controller,
  UseInterceptors,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ErrorInterceptor } from 'src/common/interceptors';

import { AreasServiceClient } from 'src/grpc/proto/collaborators/areas.pb';

import { AREAS_GRPC_CLIENT } from 'src/grpc-clients/collaborators';

import { CreateAreaDto } from './dto/request';

@Controller('areas')
@UseInterceptors(ErrorInterceptor)
export class AreasController {
  constructor(
    @Inject(AREAS_GRPC_CLIENT)
    private readonly areasGrpcClient: AreasServiceClient,
  ) {}

  @Post()
  async save(@Body() request: CreateAreaDto): Promise<void> {
    await firstValueFrom(this.areasGrpcClient.save(request));
  }
}
