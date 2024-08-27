import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { COLLABORATORS_MS } from 'src/config';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';
import { catchError, firstValueFrom } from 'rxjs';

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
}
