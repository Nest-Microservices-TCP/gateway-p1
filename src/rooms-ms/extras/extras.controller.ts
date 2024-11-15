import { CreateExtraDto, UpdateExtraDto } from './dto/request';
import { DeleteResultResponse } from 'src/common/dto/response';
import { ClientProxy } from '@nestjs/microservices';
import { ExtraResponseDto } from './dto/response';
import { firstValueFrom } from 'rxjs';
import { ROOMS_MS } from 'src/config';
import {
  Get,
  Body,
  Post,
  Param,
  Patch,
  Delete,
  Inject,
  Controller,
} from '@nestjs/common';

@Controller('extras')
export class ExtrasController {
  constructor(
    @Inject(ROOMS_MS)
    private readonly roomsClient: ClientProxy,
  ) {}

  @Get()
  async findAll(): Promise<ExtraResponseDto[]> {
    return await firstValueFrom(
      this.roomsClient.send({ cmd: 'find.all.extras' }, {}),
    );
  }

  @Get(':id')
  async findOneById(@Param('id') extraId: string): Promise<ExtraResponseDto> {
    return await firstValueFrom(
      this.roomsClient.send({ cmd: 'find.one.extra.by.id' }, { extraId }),
    );
  }

  @Post()
  async save(@Body() request: CreateExtraDto): Promise<ExtraResponseDto> {
    return await firstValueFrom(
      this.roomsClient.send({ cmd: 'save.extra' }, request),
    );
  }

  @Patch()
  async update(@Body() request: UpdateExtraDto): Promise<ExtraResponseDto> {
    return await firstValueFrom(
      this.roomsClient.send({ cmd: 'update.extra' }, request),
    );
  }

  @Delete(':id')
  async remove(@Param('id') extraId: string): Promise<DeleteResultResponse> {
    return await firstValueFrom(
      this.roomsClient.send({ cmd: 'remove.extra.by.id' }, { extraId }),
    );
  }
}
