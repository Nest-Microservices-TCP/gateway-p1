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
import { CreateWorkShiftDto, UpdateWorkShiftDto } from './dto/request';
import { WorkShiftResponseDto } from './dto/response';

@UseInterceptors(ErrorInterceptor)
@Controller('work-shifts')
export class WorkShiftsController {
  constructor(
    @Inject(COLLABORATORS_MICROSERVICE)
    private readonly collaboratorsClient: ClientProxy,
  ) {}

  @Get()
  findAll(): Promise<WorkShiftResponseDto[]> {
    return firstValueFrom(
      this.collaboratorsClient.send({ cmd: 'find.all.work.shifts' }, {}),
    );
  }

  @Get(':id')
  findOne(@Param('id') workShiftId: string): Promise<WorkShiftResponseDto> {
    return firstValueFrom(
      this.collaboratorsClient.send(
        { cmd: 'find.one.work.shift' },
        { workShiftId },
      ),
    );
  }

  @Post()
  save(@Body() request: CreateWorkShiftDto): Promise<WorkShiftResponseDto> {
    return firstValueFrom(
      this.collaboratorsClient.send({ cmd: 'save.work.shift' }, request),
    );
  }

  @Patch()
  update(@Body() request: UpdateWorkShiftDto): Promise<WorkShiftResponseDto> {
    return firstValueFrom(
      this.collaboratorsClient.send({ cmd: 'update.work.shift' }, request),
    );
  }

  @Delete()
  remove(@Param('id') workShiftId: string): Promise<DeleteResultResponse> {
    return firstValueFrom(
      this.collaboratorsClient.send(
        { cmd: 'remove.work.shift.by.id' },
        { workShiftId },
      ),
    );
  }
}
