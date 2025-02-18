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
    this.roomsClientKafka.subscribeToResponseOf('rooms.find.all.rents');
    this.roomsClientKafka.subscribeToResponseOf('rooms.find.one.rent');
    this.roomsClientKafka.subscribeToResponseOf('rooms.save.rent');
    this.roomsClientKafka.subscribeToResponseOf('rooms.update.rent');
  }

  @Get()
  async findAll(): Promise<RentResponseDto[]> {
    return firstValueFrom(
      this.roomsClientKafka.send('rooms.find.all.rents', {}),
    );
  }

  @Get('id')
  async findOne(
    @Param('id', ParseUUIDPipe) rentId: string,
  ): Promise<RentResponseDto> {
    return firstValueFrom(
      this.roomsClientKafka.send('rooms.find.one.rent', { rentId }),
    );
  }

  @Post()
  async save(@Body() request: CreateRentDto) {
    return firstValueFrom(
      this.roomsClientKafka.send('rooms.save.rent', request),
    );
  }

  @Patch()
  async update(@Body() request: UpdateRentDto): Promise<RentResponseDto> {
    return firstValueFrom(
      this.roomsClientKafka.send('rooms.update.room', request),
    );
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseUUIDPipe) rentId: string,
  ): Promise<DeleteResultResponse> {
    return firstValueFrom(
      this.roomsClientKafka.send('rooms.remove.rent', { rentId }),
    );
  }
}
