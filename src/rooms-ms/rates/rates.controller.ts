import {
  Get,
  Body,
  Post,
  Param,
  Inject,
  Controller,
  ParseUUIDPipe,
  UseInterceptors,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ErrorInterceptor } from 'src/common/interceptors';

import { Rate, RatesServiceClient } from 'src/grpc/rooms/rates.pb';

import { RATES_GRPC_CLIENT } from 'src/grpc-clients/rooms/rates-grpc.provider';

import { CreateRateDto, FindRatesByIdsDto } from './dto/request';

@Controller('rates')
@UseInterceptors(ErrorInterceptor)
export class RatesController {
  constructor(
    @Inject(RATES_GRPC_CLIENT)
    private readonly ratesGrpClient: RatesServiceClient,
  ) {}

  @Post()
  async save(@Body() request: CreateRateDto): Promise<void> {
    firstValueFrom(this.ratesGrpClient.save(request));
  }

  @Get()
  async findAll(): Promise<Rate[]> {
    /**
     * Cuando se trabaja con Kafka, se espera que el primer argumento del .send()
     * sea un string/cadena el cual comienza con el topic hacia el cual se produce
     * el mensaje
     */
    const { rates } = await firstValueFrom(this.ratesGrpClient.find({}));

    return rates;
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) rate_id: string): Promise<Rate> {
    return firstValueFrom(this.ratesGrpClient.findOne({ rate_id }));
  }

  @Get('find-by-ids')
  async findByIds(@Body() request: FindRatesByIdsDto): Promise<Rate[]> {
    const { rates } = await firstValueFrom(
      this.ratesGrpClient.findByIds(request),
    );

    return rates;
  }
}
