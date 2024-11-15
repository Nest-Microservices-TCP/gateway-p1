import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ROOMS_MS } from 'src/config';
import { ExtraResponseDto } from './dto/response';
import { firstValueFrom } from 'rxjs';

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
}
