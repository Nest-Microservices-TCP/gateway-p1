import {
  Controller,
  Get,
  Inject,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

// import { ROOMS_MICROSERVICE } from 'src/config';
import { ROOMS_CLIENT_KAFKA } from 'src/config';

import { ErrorInterceptor } from 'src/common/interceptors';

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
}
