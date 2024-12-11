import { DeleteResultResponse } from 'src/common/dto/response';
import { ErrorInterceptor } from 'src/common/interceptors';
import { CollaboratorResponseDto } from './dto/response';
import { ClientProxy } from '@nestjs/microservices';
import { COLLABORATORS_MS } from 'src/config';
import { firstValueFrom } from 'rxjs';
import {
  UpdateCollaboratorDto,
  CreateCollaboratorDto,
  FindOneCollaboratorById,
} from './dto/request';
import {
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Inject,
  Controller,
  UseInterceptors,
} from '@nestjs/common';

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
