import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { COLLABORATORS_MICROSERVICE } from 'src/config';

import { ErrorInterceptor } from 'src/common/interceptors';

import { DeleteResultResponse } from 'src/common/dto/response';
import { CreateAreaDto, UpdateAreaDto } from './dto/request';
import { AreaResponseDto } from './dto/response';

@Controller('areas')
@UseInterceptors(ErrorInterceptor)
export class AreasController {
  constructor(
    @Inject(COLLABORATORS_MICROSERVICE)
    private readonly collaboratorsClient: ClientProxy,
  ) {}

  @Post()
  save(@Body() request: CreateAreaDto): Promise<AreaResponseDto> {
    return firstValueFrom(
      this.collaboratorsClient.send({ cmd: 'save.area' }, request),
    );
  }

  @Get()
  findAll(): Promise<AreaResponseDto[]> {
    return firstValueFrom(
      this.collaboratorsClient.send({ cmd: 'find.all.areas' }, {}),
    );
  }

  @Get(':id')
  findOne(@Param('id') areaId: string): Promise<AreaResponseDto> {
    return firstValueFrom(
      this.collaboratorsClient.send({ cmd: 'find.one.area' }, { areaId }),
    );
  }

  @Patch()
  update(@Body() request: UpdateAreaDto): Promise<AreaResponseDto> {
    return firstValueFrom(
      this.collaboratorsClient.send({ cmd: 'update.area' }, request),
    );
  }

  @Delete(':id')
  remove(@Param('id') areaId: string): Promise<DeleteResultResponse> {
    return firstValueFrom(
      this.collaboratorsClient.send({ cmd: 'remove.area.by.id' }, { areaId }),
    );
  }
}
