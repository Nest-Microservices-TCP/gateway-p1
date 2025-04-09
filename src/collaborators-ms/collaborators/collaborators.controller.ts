import {
  Get,
  Body,
  Post,
  Param,
  Inject,
  Controller,
  ParseUUIDPipe,
  UseInterceptors,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ErrorInterceptor } from 'src/common/interceptors';

import {
  Collaborator,
  CollaboratorsServiceClient,
} from 'src/grpc/proto-files/collaborators/collaborators.pb';

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

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) collaborator_id: string,
  ): Promise<Collaborator> {
    return firstValueFrom(
      this.collaboratorsGrpcClient.findOne({ collaborator_id }),
    );
  }

  @Get()
  async find(): Promise<Collaborator[]> {
    const { collaborators } = await firstValueFrom(
      this.collaboratorsGrpcClient.find({}),
    );

    return collaborators;
  }
}
