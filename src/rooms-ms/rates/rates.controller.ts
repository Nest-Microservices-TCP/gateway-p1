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
    this.roomsClientKafka.subscribeToResponseOf('rates.find.all');
    this.roomsClientKafka.subscribeToResponseOf('rates.find.one');
    this.roomsClientKafka.subscribeToResponseOf('rates.save');
    this.roomsClientKafka.subscribeToResponseOf('rates.update');
    this.roomsClientKafka.subscribeToResponseOf('rates.remove');
  }

  @Get()
  async findAll(): Promise<RateResponseDto[]> {
    // return firstValueFrom(
    //   this.roomsClientKafka.send({ cmd: 'find.all' }, {}),
    // );
    /**
     * Cuando se trabaja con Kafka, se espera que el primer argumento del .send()
     * sea un string/cadena el cual comienza con el topic hacia el cual se produce
     * el mensaje
     */
    return firstValueFrom(this.roomsClientKafka.send('rates.find.all', {}));
  }

  @Get(':id')
  async findOne(@Param('id') rateId: string): Promise<RateResponseDto> {
    return firstValueFrom(
      this.roomsClientKafka.send('rates.find.one', { rateId }),
    );
  }

  @Post()
  async save(@Body() request: CreateRateDto): Promise<RateResponseDto> {
    return firstValueFrom(this.roomsClientKafka.send('rates.save', request));
  }

  @Patch()
  async update(@Body() request: UpdateRateDto): Promise<RateResponseDto> {
    return firstValueFrom(this.roomsClientKafka.send('rates.update', request));
  }

  @Delete(':id')
  async remove(@Param('id') rateId: string): Promise<DeleteResultResponse> {
    return firstValueFrom(
      this.roomsClientKafka.send('rates.remove', { rateId }),
    );
  }
}
