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
import { CreateAreaDto, UpdateAreaDto } from './dto';
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

  @Get()
  findAll() {
    return firstValueFrom(
      this.collaboratorsClient.send({ cmd: 'find.all.areas' }, {}).pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      ),
    );
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return firstValueFrom(
      this.collaboratorsClient
        .send({ cmd: 'find.one.area.by.id' }, { id })
        .pipe(
          catchError((error) => {
            throw new RpcException(error);
          }),
        ),
    );
  }

  @Patch()
  update(@Body() request: UpdateAreaDto) {
    return firstValueFrom(
      this.collaboratorsClient.send({ cmd: 'update.area' }, request).pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      ),
    );
  }

  @Delete(':id')
  deleteById(@Param('id') id: string) {
    console.log(id);
    return firstValueFrom(
      this.collaboratorsClient.send({ cmd: 'delete.area.by.id' }, { id }).pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      ),
    );
  }
}
