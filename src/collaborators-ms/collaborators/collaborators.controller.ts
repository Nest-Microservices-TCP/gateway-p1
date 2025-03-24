import {
  Body,
  Post,
  Inject,
  Controller,
  UseInterceptors,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ErrorInterceptor } from 'src/common/interceptors';

import { CollaboratorsServiceClient } from 'src/grpc/proto/collaborators/collaborators.pb';

import { COLLABORATORS_GRPC_CLIENT } from 'src/grpc-clients/collaborators';

import { CreateCollaboratorDto } from './dto/request';

@Controller('collaborators')
@UseInterceptors(ErrorInterceptor)
export class CollaboratorsController {
  constructor(
    @Inject(COLLABORATORS_GRPC_CLIENT)
    private readonly collaboratorsGrpcClient: CollaboratorsServiceClient,
  ) {}

  @Post()
  async save(@Body() request: CreateCollaboratorDto): Promise<void> {
    await firstValueFrom(this.collaboratorsGrpcClient.save(request));
  }
}
