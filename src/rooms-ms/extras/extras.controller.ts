import { CreateExtraDto, UpdateExtraDto } from './dto/request';
import { DeleteResultResponse } from 'src/common/dto/response';
import { ErrorInterceptor } from 'src/common/interceptors';
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
  UseInterceptors,
} from '@nestjs/common';

@Controller('extras')
@UseInterceptors(ErrorInterceptor)
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
  async findOne(@Param('id') extraId: string): Promise<ExtraResponseDto> {
    return await firstValueFrom(
      this.roomsClient.send({ cmd: 'find.one.extra' }, { extraId }),
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
