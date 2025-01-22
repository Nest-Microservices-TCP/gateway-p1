import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { COLLABORATORS_MS } from 'src/config';

import { ErrorInterceptor } from 'src/common/interceptors';

import { DeleteResultResponse } from 'src/common/dto/response';
import {
  CreateCollaboratorDto,
  FindOneCollaboratorById,
  UpdateCollaboratorDto,
} from './dto/request';
import { CollaboratorResponseDto } from './dto/response';

@Controller('collaborators')
@UseInterceptors(ErrorInterceptor)
export class CollaboratorsController {
  constructor(
    @Inject(COLLABORATORS_MS)
    private readonly collaboratorsClient: ClientProxy,
  ) {}

  @Post()
  async save(
    @Body() request: CreateCollaboratorDto,
  ): Promise<CollaboratorResponseDto> {
    return await firstValueFrom(
      this.collaboratorsClient.send({ cmd: 'save.collaborator' }, request),
    );
  }

  @Get()
  async findAll(): Promise<CollaboratorResponseDto[]> {
    return firstValueFrom(
      this.collaboratorsClient.send({ cmd: 'find.all.collaborators' }, {}),
    );
  }

  @Post('find-one')
  async findOne(
    @Body() request: FindOneCollaboratorById,
  ): Promise<CollaboratorResponseDto> {
    return firstValueFrom(
      this.collaboratorsClient.send({ cmd: 'find.one.collaborator' }, request),
    );
  }

  @Patch()
  async update(
    @Body() request: UpdateCollaboratorDto,
  ): Promise<CollaboratorResponseDto> {
    return firstValueFrom(
      this.collaboratorsClient.send({ cmd: 'update.collaborator' }, request),
    );
  }

  @Delete(':id')
  async remove(
    @Param('id') collaboratorId: string,
  ): Promise<DeleteResultResponse> {
    return firstValueFrom(
      this.collaboratorsClient.send(
        { cmd: 'remove.collaborator.by.id' },
        { collaboratorId },
      ),
    );
  }
}
