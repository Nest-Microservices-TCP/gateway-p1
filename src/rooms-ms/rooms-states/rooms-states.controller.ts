import { CreateRoomStateDto, UpdateRoomStateDto } from './dto/request';
import { DeleteResultResponse } from 'src/common/dto/response';
import { ErrorInterceptor } from 'src/common/interceptors';
import { RoomStateResponseDto } from './dto/response';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ROOMS_MS } from 'src/config';
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

@Controller('rooms-states')
@UseInterceptors(ErrorInterceptor)
export class RoomStatesController {
  constructor(
    @Inject(ROOMS_MS)
    private readonly roomsClient: ClientProxy,
  ) {}

  @Post()
  async save(
    @Body() request: CreateRoomStateDto,
  ): Promise<RoomStateResponseDto> {
    return firstValueFrom(
      this.roomsClient.send({ cmd: 'save.roomState' }, request),
    );
  }

  @Get(':id')
  async findOneById(
    @Param('id') roomStateId: string,
  ): Promise<RoomStateResponseDto> {
    return firstValueFrom(
      this.roomsClient.send({ cmd: 'find.one.roomState' }, { roomStateId }),
    );
  }

  @Get()
  async findAll(): Promise<RoomStateResponseDto[]> {
    return firstValueFrom(
      this.roomsClient.send({ cmd: 'find.all.roomsStates' }, {}),
    );
  }

  @Patch()
  async update(
    @Body() request: UpdateRoomStateDto,
  ): Promise<RoomStateResponseDto> {
    return firstValueFrom(
      this.roomsClient.send({ cmd: 'update.roomState' }, request),
    );
  }

  @Delete(':id')
  async remove(
    @Param('id') roomStateId: string,
  ): Promise<DeleteResultResponse> {
    return firstValueFrom(
      this.roomsClient.send({ cmd: 'remove.roomState.by.id' }, { roomStateId }),
    );
  }
}
