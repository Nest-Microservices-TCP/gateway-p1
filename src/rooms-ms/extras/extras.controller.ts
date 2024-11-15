import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ROOMS_MS } from 'src/config';
import { ExtraResponseDto } from './dto/response';
import { firstValueFrom } from 'rxjs';
import { CreateExtraDto } from './dto/request';

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
}
