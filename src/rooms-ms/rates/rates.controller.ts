import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { ROOMS_MICROSERVICE } from 'src/config';

import { ErrorInterceptor } from 'src/common/interceptors';

import { DeleteResultResponse } from 'src/common/dto/response';
import { CreateRateDto, UpdateRateDto } from './dto/request';
import { RateResponseDto } from './dto/response';

@Controller('rates')
@UseInterceptors(ErrorInterceptor)
export class RatesController {
  constructor(
    @Inject(ROOMS_MICROSERVICE)
    private readonly roomsClient: ClientProxy,
  ) {}

  @Get()
  async findAll(): Promise<RateResponseDto[]> {
    return await firstValueFrom(
      this.roomsClient.send({ cmd: 'find.all.rates' }, {}),
    );
  }

  @Get(':id')
  async findOne(@Param('id') rateId: string): Promise<RateResponseDto> {
    return await firstValueFrom(
      this.roomsClient.send({ cmd: 'find.one.rate' }, { rateId }),
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

  @Delete(':id')
  async remove(@Param('id') rateId: string): Promise<DeleteResultResponse> {
    return await firstValueFrom(
      this.roomsClient.send({ cmd: 'remove.rate.by.id' }, { rateId }),
    );
  }
}
