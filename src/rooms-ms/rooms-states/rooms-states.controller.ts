import { ROOMS_MS } from 'src/config';
import { catchError, firstValueFrom } from 'rxjs';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateRoomStateDto, UpdateRoomStateDto } from './dto/request';
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

@Controller('rooms-states')
export class RoomStatesController {
  constructor(
    @Inject(ROOMS_MS)
    private readonly roomsClient: ClientProxy,
  ) {}

  @Post()
  async save(@Body() request: CreateRoomStateDto) {
    return firstValueFrom(
      this.roomsClient.send({ cmd: 'save.roomState' }, request).pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      ),
    );
  }

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    return firstValueFrom(
      this.roomsClient
        .send({ cmd: 'find.one.roomState' }, { roomStateId: id })
        .pipe(
          catchError((error) => {
            throw new RpcException(error);
          }),
        ),
    );
  }

  @Get()
  async findAll() {
    return firstValueFrom(
      this.roomsClient.send({ cmd: 'find.all.roomsStates' }, {}).pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      ),
    );
  }

  @Patch()
  async update(@Body() request: UpdateRoomStateDto) {
    return firstValueFrom(
      this.roomsClient.send({ cmd: 'update.roomState' }, request).pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      ),
    );
  }

  @Delete(':id')
  async deleteById(id: string) {
    return firstValueFrom(
      this.roomsClient.send({ cmd: 'delete.roomState.by.id' }, { id }).pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      ),
    );
  }
}
