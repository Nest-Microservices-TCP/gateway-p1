import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { COLLABORATORS_MS } from 'src/config';
import { CreateAreaDto } from './dto';
import { catchError, firstValueFrom } from 'rxjs';

@Controller('areas')
export class AreasController {
  constructor(
    @Inject(COLLABORATORS_MS)
    private readonly collaboratorsClient: ClientProxy,
  ) {}

  @Post()
  save(@Body() request: CreateAreaDto) {
    return firstValueFrom(
      this.collaboratorsClient.send({ cmd: 'save.area' }, request).pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      ),
    );
  }
}
