import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { ROOMS_CLIENT_KAFKA } from 'src/config';

import { ErrorInterceptor } from 'src/common/interceptors';

import { DeleteResultResponse } from 'src/common/dto/response';
import { CreateRentDto, UpdateRentDto } from './dto/request';
import { RentResponseDto } from './dto/response';

@Controller('rents')
@UseInterceptors(ErrorInterceptor)
export class RentsController {
  constructor(
    @Inject(ROOMS_CLIENT_KAFKA)
    private readonly roomsClientKafka: ClientKafka,
  ) {}

  async onModuleInit() {
    this.roomsClientKafka.subscribeToResponseOf('rents.find.all');
    this.roomsClientKafka.subscribeToResponseOf('rents.find.one');
    this.roomsClientKafka.subscribeToResponseOf('rents.save');
    this.roomsClientKafka.subscribeToResponseOf('rents.update');
    this.roomsClientKafka.subscribeToResponseOf('rents.remove');
  }

  @Get()
  async findAll(): Promise<RentResponseDto[]> {
    return firstValueFrom(this.roomsClientKafka.send('rents.find.all', {}));
  }

  @Get('id')
  async findOne(
    @Param('id', ParseUUIDPipe) rentId: string,
  ): Promise<RentResponseDto> {
    return firstValueFrom(
      this.roomsClientKafka.send('rents.find.one', { rentId }),
    );
  }

  @Post()
  async save(@Body() request: CreateRentDto) {
    return firstValueFrom(this.roomsClientKafka.send('rents.save', request));
  }

  @Patch()
  async update(@Body() request: UpdateRentDto): Promise<RentResponseDto> {
    return firstValueFrom(this.roomsClientKafka.send('rents.update', request));
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseUUIDPipe) rentId: string,
  ): Promise<DeleteResultResponse> {
    return firstValueFrom(
      this.roomsClientKafka.send('rents.remove', { rentId }),
    );
  }
}
