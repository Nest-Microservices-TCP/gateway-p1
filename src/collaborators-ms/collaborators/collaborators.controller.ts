import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { COLLABORATORS_KAFKA_CLIENT } from 'src/config';

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
export class CollaboratorsController implements OnModuleInit {
  constructor(
    @Inject(COLLABORATORS_KAFKA_CLIENT)
    private readonly collaboratorsClientKafka: ClientKafka,
  ) {}

  onModuleInit() {
    this.collaboratorsClientKafka.subscribeToResponseOf(
      'collaborators.save.collaborator',
    );
    this.collaboratorsClientKafka.subscribeToResponseOf(
      'collaborators.find.all.collaborators',
    );
    this.collaboratorsClientKafka.subscribeToResponseOf(
      'collaborators.find.one.collaborator',
    );
    this.collaboratorsClientKafka.subscribeToResponseOf(
      'collaborators.update.collaborator',
    );
    this.collaboratorsClientKafka.subscribeToResponseOf(
      'collaborators.remove.collaborator',
    );
  }

  @Post()
  async save(
    @Body() request: CreateCollaboratorDto,
  ): Promise<CollaboratorResponseDto> {
    return await firstValueFrom(
      this.collaboratorsClientKafka.send(
        'collaborators.save.collaborator',
        request,
      ),
    );
  }

  @Get()
  async findAll(): Promise<CollaboratorResponseDto[]> {
    return firstValueFrom(
      this.collaboratorsClientKafka.send(
        'collaborators.find.all.collaborators',
        {},
      ),
    );
  }

  @Post('find-one')
  async findOne(
    @Body() request: FindOneCollaboratorById,
  ): Promise<CollaboratorResponseDto> {
    return firstValueFrom(
      this.collaboratorsClientKafka.send(
        'collaborators.find.one.collaborator',
        request,
      ),
    );
  }

  @Patch()
  async update(
    @Body() request: UpdateCollaboratorDto,
  ): Promise<CollaboratorResponseDto> {
    return firstValueFrom(
      this.collaboratorsClientKafka.send(
        'collaborators.update.collaborator',
        request,
      ),
    );
  }

  @Delete(':id')
  async remove(
    @Param('id') collaboratorId: string,
  ): Promise<DeleteResultResponse> {
    return firstValueFrom(
      this.collaboratorsClientKafka.send('collaborators.remove.collaborator', {
        collaboratorId,
      }),
    );
  }
}
