import {
  Body,
  Post,
  Inject,
  Controller,
  UseInterceptors,
} from '@nestjs/common';
import { ErrorInterceptor } from 'src/common/interceptors';

import { CreateRentDto } from './dto/request';
import { RENTS_GRPC_CLIENT } from 'src/grpc-clients/rooms';
import { RentsServiceClient } from 'src/grpc/proto-files/rooms/rents.pb';

@Controller('rents')
@UseInterceptors(ErrorInterceptor)
export class RentsController {
  constructor(
    @Inject(RENTS_GRPC_CLIENT)
    private readonly rentsGrpcClient: RentsServiceClient,
  ) {}

  @Post()
  async save(@Body() request: CreateRentDto): Promise<void> {
    this.rentsGrpcClient.save(request);
  }
}
