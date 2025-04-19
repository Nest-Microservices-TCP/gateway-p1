import {
  Body,
  Post,
  Inject,
  Controller,
  UseInterceptors,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ErrorInterceptor } from 'src/common/interceptors';

import { RentsServiceClient } from 'src/grpc/rooms/rents.pb';

import { RENTS_GRPC_CLIENT } from 'src/grpc-clients/rooms';

import { CreateRentDto } from './dto/request';

@Controller('rents')
@UseInterceptors(ErrorInterceptor)
export class RentsController {
  constructor(
    @Inject(RENTS_GRPC_CLIENT)
    private readonly rentsGrpcClient: RentsServiceClient,
  ) {}

  @Post()
  async save(@Body() request: CreateRentDto): Promise<void> {
    await firstValueFrom(this.rentsGrpcClient.save(request));
  }
}
