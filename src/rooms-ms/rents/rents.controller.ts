import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { CreateRoomDto } from '../rooms/dto/request';
import { ClientProxy } from '@nestjs/microservices';
import { RentResponseDto } from './dto/response';
import { firstValueFrom } from 'rxjs';
import { ROOMS_MS } from 'src/config';

@Controller('rents')
export class RentsController {
  constructor(
    @Inject(ROOMS_MS)
    private roomsClient: ClientProxy,
  ) {}

  @Post()
  async save(@Body() request: CreateRoomDto): Promise<RentResponseDto> {
    return firstValueFrom(this.roomsClient.send({ cmd: 'save.rent' }, request));
  }

  @Get()
  async findAl(): Promise<RentResponseDto[]> {
    return firstValueFrom(this.roomsClient.send({ cmd: 'find.all.rents' }, {}));
  }
}
