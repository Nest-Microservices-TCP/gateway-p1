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
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

// import { ROOMS_MICROSERVICE } from 'src/config';
import { ROOMS_CLIENT_KAFKA } from 'src/config';

import { ErrorInterceptor } from 'src/common/interceptors';

import { DeleteResultResponse } from 'src/common/dto/response';
import { CreateRateDto, UpdateRateDto } from './dto/request';
import { RateResponseDto } from './dto/response';

@Controller('rates')
@UseInterceptors(ErrorInterceptor)
export class RatesController {
  constructor(
    // @Inject(ROOMS_MICROSERVICE)
    // private readonly roomsClient: ClientProxy,
    @Inject(ROOMS_CLIENT_KAFKA)
    private readonly roomsClientKafka: ClientKafka,
  ) {}

  async onModuleInit() {
    this.roomsClientKafka.subscribeToResponseOf('rooms.find.all.rates');
    this.roomsClientKafka.subscribeToResponseOf('rooms.find.one.rate');
    this.roomsClientKafka.subscribeToResponseOf('rooms.save.rate');
    this.roomsClientKafka.subscribeToResponseOf('rooms.update.rate');
  }

  @Get()
  async findAll(): Promise<RateResponseDto[]> {
    // return firstValueFrom(
    //   this.roomsClientKafka.send({ cmd: 'find.all.rates' }, {}),
    // );
    /**
     * Cuando se trabaja con Kafka, se espera que el primer argumento del .send()
     * sea un string/cadena el cual comienza con el topic hacia el cual se produce
     * el mensaje
     */
    return firstValueFrom(
      this.roomsClientKafka.send('rooms.find.all.rates', {}),
    );
  }

  @Get(':id')
  async findOne(@Param('id') rateId: string): Promise<RateResponseDto> {
    return firstValueFrom(
      this.roomsClientKafka.send('rooms.find.one.rate', { rateId }),
    );
  }

  @Post()
  async save(@Body() request: CreateRateDto): Promise<RateResponseDto> {
    return firstValueFrom(
      this.roomsClientKafka.send('rooms.save.rate', request),
    );
  }

  @Patch()
  async update(@Body() request: UpdateRateDto): Promise<RateResponseDto> {
    return firstValueFrom(
      this.roomsClientKafka.send('rooms.update.rate', request),
    );
  }

  @Delete(':id')
  async remove(@Param('id') rateId: string): Promise<DeleteResultResponse> {
    return firstValueFrom(
      this.roomsClientKafka.send('rooms.remove.rate', { rateId }),
    );
  }
}
