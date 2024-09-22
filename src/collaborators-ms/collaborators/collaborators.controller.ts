import { ClientProxy } from '@nestjs/microservices';
import { COLLABORATORS_MS } from 'src/config';
import { firstValueFrom } from 'rxjs';
import { ErrorInterceptor } from 'src/common/interceptors';
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
import {
  CreateCollaboratorDto,
  FindOneCollaboratorById,
  UpdateCollaboratorDto,
} from './dto/request';

@Controller('collaborators')
@UseInterceptors(ErrorInterceptor)
export class CollaboratorsController {
  constructor(
    @Inject(COLLABORATORS_MS)
    private readonly collaboratorsClient: ClientProxy,
  ) {}

  @Post()
  async save(@Body() request: CreateCollaboratorDto) {
    return await firstValueFrom(
      this.collaboratorsClient.send({ cmd: 'save.collaborator' }, request),
    );
  }

  @Get()
  async findAll() {
    return firstValueFrom(
      this.collaboratorsClient.send({ cmd: 'find.all.collaborators' }, {}),
    );
  }

  @Post('find-one')
  async findOneById(@Body() request: FindOneCollaboratorById) {
    return firstValueFrom(
      this.collaboratorsClient.send(
        { cmd: 'find.one.collaborator.by.id' },
        request,
      ),
    );
  }

  @Patch()
  async update(@Body() request: UpdateCollaboratorDto) {
    return firstValueFrom(
      this.collaboratorsClient.send({ cmd: 'update.collaborator' }, request),
    );
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    return firstValueFrom(
      this.collaboratorsClient.send(
        { cmd: 'delete.collaborator.by.id' },
        { id },
      ),
    );
  }
}
