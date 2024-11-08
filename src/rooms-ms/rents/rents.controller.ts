import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateRoomDto } from '../rooms/dto/request';
import { ClientProxy } from '@nestjs/microservices';
import { RentResponseDto } from './dto/response';
import { firstValueFrom } from 'rxjs';
import { ROOMS_MS } from 'src/config';
import { UpdateRentDto } from './dto/request';

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

  @Get(':id')
  async findOneById(@Param('id') rentId: string): Promise<RentResponseDto> {
    return firstValueFrom(
      this.roomsClient.send({ cmd: 'find.one.rent.by.id' }, { rentId }),
    );
  }

  @Patch()
  async update(@Body() request: UpdateRentDto): Promise<RentResponseDto> {
    return firstValueFrom(
      this.roomsClient.send({ cmd: 'update.rent' }, request),
    );
  }
}
