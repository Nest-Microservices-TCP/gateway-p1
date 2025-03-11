import { firstValueFrom } from 'rxjs';
import { ErrorInterceptor } from 'src/common/interceptors';
import { Get, Inject, Controller, UseInterceptors } from '@nestjs/common';

import { Rate, RatesServiceClient } from 'src/grpc/proto/rooms/rates.pb';

import { RATES_GRPC_CLIENT } from 'src/grpc-clients/rooms/rates-grpc.provider';

@Controller('rates')
@UseInterceptors(ErrorInterceptor)
export class RatesController {
  constructor(
    @Inject(RATES_GRPC_CLIENT)
    private readonly ratesGrpClient: RatesServiceClient,
  ) {}

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
}
