import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { COLLABORATORS_MS } from 'src/config';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';
import { catchError, firstValueFrom } from 'rxjs';
import { FindOneCollaboratorById, UpdateCollaboratorDto } from './dto';

@Controller('collaborators')
export class CollaboratorsController {
  constructor(
    @Inject(COLLABORATORS_MS)
    private readonly collaboratorsClient: ClientProxy,
  ) {}

  @Post()
  async save(@Body() request: CreateCollaboratorDto) {
    return await firstValueFrom(
      this.collaboratorsClient.send({ cmd: 'save.collaborator' }, request).pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      ),
    );
  }

  @Get()
  async findAll() {
    return firstValueFrom(
      this.collaboratorsClient.send({ cmd: 'find.all.collaborators' }, {}).pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      ),
    );
  }

  @Post('find-one')
  async findOneById(@Body() request: FindOneCollaboratorById) {
    return firstValueFrom(
      this.collaboratorsClient
        .send({ cmd: 'find.one.collaborator.by.id' }, request)
        .pipe(
          catchError((error) => {
            throw new RpcException(error);
          }),
        ),
    );
  }

  @Patch()
  async update(@Body() request: UpdateCollaboratorDto) {
    return firstValueFrom(
      this.collaboratorsClient
        .send({ cmd: 'update.collaborator' }, request)
        .pipe(
          catchError((error) => {
            throw new RpcException(error);
          }),
        ),
    );
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    return firstValueFrom(
      this.collaboratorsClient
        .send({ cmd: 'delete.collaborator.by.id' }, { id })
        .pipe(
          catchError((error) => {
            throw new RpcException(error);
          }),
        ),
    );
  }
}
