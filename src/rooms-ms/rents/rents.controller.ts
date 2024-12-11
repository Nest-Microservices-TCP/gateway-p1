import { DeleteResultResponse } from 'src/common/dto/response';
import { ErrorInterceptor } from 'src/common/interceptors';
import { CreateRoomDto } from '../rooms/dto/request';
import { ClientProxy } from '@nestjs/microservices';
import { RentResponseDto } from './dto/response';
import { UpdateRentDto } from './dto/request';
import { firstValueFrom } from 'rxjs';
import { ROOMS_MS } from 'src/config';
import {
  Get,
  Body,
  Post,
  Param,
  Patch,
  Inject,
  Delete,
  Controller,
  UseInterceptors,
} from '@nestjs/common';

@Controller('rents')
@UseInterceptors(ErrorInterceptor)
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
  async findAll(): Promise<RentResponseDto[]> {
    return firstValueFrom(this.roomsClient.send({ cmd: 'find.all.rents' }, {}));
  }

  @Get(':id')
  async findOne(@Param('id') rentId: string): Promise<RentResponseDto> {
    return firstValueFrom(
      this.roomsClient.send({ cmd: 'find.one.rent' }, { rentId }),
    );
  }

  @Patch()
  async update(@Body() request: UpdateRentDto): Promise<RentResponseDto> {
    return firstValueFrom(
      this.roomsClient.send({ cmd: 'update.rent' }, request),
    );
  }

  @Delete(':id')
  async remove(@Param('rentId') rentId: string): Promise<DeleteResultResponse> {
    return firstValueFrom(
      this.roomsClient.send({ cmd: 'remove.rent.by.id' }, { rentId }),
    );
  }
}
