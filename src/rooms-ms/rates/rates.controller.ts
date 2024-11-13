import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RateResponseDto } from './dto/response';
import { firstValueFrom } from 'rxjs';
import { ROOMS_MS } from 'src/config';

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
}
