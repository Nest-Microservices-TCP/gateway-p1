import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { ROOMS_CLIENT_KAFKA } from 'src/config';

import { ErrorInterceptor } from 'src/common/interceptors';

import { CreateRentDto } from './dto/request';
import { RentResponseDto } from './dto/response';

@Controller('rents')
@UseInterceptors(ErrorInterceptor)
export class RentsController {
  constructor(
    @Inject(ROOMS_CLIENT_KAFKA)
    private readonly roomsClientKafka: ClientKafka,
  ) {}

  async onModuleInit() {
    this.roomsClientKafka.subscribeToResponseOf('rooms.find.all.rents');
    this.roomsClientKafka.subscribeToResponseOf('rooms.save.rent');
  }

  @Get()
  async findAll(): Promise<RentResponseDto[]> {
    return firstValueFrom(
      this.roomsClientKafka.send('rooms.find.all.rents', {}),
    );
  }

  @Post()
  async save(@Body() request: CreateRentDto) {
    return firstValueFrom(
      this.roomsClientKafka.send('rooms.save.rent', request),
    );
  }
}
