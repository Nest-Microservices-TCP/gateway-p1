import { CreateRateDto, UpdateRateDto } from './dto/request';
import { ClientProxy } from '@nestjs/microservices';
import { RateResponseDto } from './dto/response';
import { firstValueFrom } from 'rxjs';
import { ROOMS_MS } from 'src/config';
import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Inject,
  Controller,
} from '@nestjs/common';

@Controller('rates')
export class RatesController {
  constructor(
    @Inject(ROOMS_MS)
    private readonly roomsClient: ClientProxy,
  ) {}

  @Get()
  async findAll(): Promise<RateResponseDto[]> {
    return await firstValueFrom(
      this.roomsClient.send({ cmd: 'find.all.rates' }, {}),
    );
  }

  @Get(':id')
  async findOneById(@Param('id') rateId: string): Promise<RateResponseDto> {
    return await firstValueFrom(
      this.roomsClient.send({ cmd: 'find.one.rate.by.id' }, { rateId }),
    );
  }

  @Post()
  async save(@Body() request: CreateRateDto): Promise<RateResponseDto> {
    return await firstValueFrom(
      this.roomsClient.send({ cmd: 'save.rate' }, request),
    );
  }

  @Patch()
  async update(@Body() request: UpdateRateDto): Promise<RateResponseDto> {
    return await firstValueFrom(
      this.roomsClient.send({ cmd: 'update.rate' }, request),
    );
  }
}
