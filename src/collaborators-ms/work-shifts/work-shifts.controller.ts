import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { COLLABORATORS_KAFKA_CLIENT } from 'src/config';

import { ErrorInterceptor } from 'src/common/interceptors';

import { DeleteResultResponse } from 'src/common/dto/response';
import { CreateWorkShiftDto, UpdateWorkShiftDto } from './dto/request';
import { WorkShiftResponseDto } from './dto/response';

@UseInterceptors(ErrorInterceptor)
@Controller('work-shifts')
export class WorkShiftsController implements OnModuleInit {
  constructor(
    @Inject(COLLABORATORS_KAFKA_CLIENT)
    private readonly collaboratorsClientKafka: ClientKafka,
  ) {}

  onModuleInit() {
    this.collaboratorsClientKafka.subscribeToResponseOf(
      'collaborators.find.all.workShifts',
    );
    this.collaboratorsClientKafka.subscribeToResponseOf(
      'collaborators.find.one.workShift',
    );
    this.collaboratorsClientKafka.subscribeToResponseOf(
      'collaborators.save.workShift',
    );
    this.collaboratorsClientKafka.subscribeToResponseOf(
      'collaborators.update.workShift',
    );
    this.collaboratorsClientKafka.subscribeToResponseOf(
      'collaborators.remove.workShift',
    );
  }

  @Get()
  async findAll(): Promise<WorkShiftResponseDto[]> {
    return firstValueFrom(
      this.collaboratorsClientKafka.send(
        'collaborators.find.all.workShifts',
        {},
      ),
    );
  }

  @Get(':id')
  async findOne(
    @Param('id') workShiftId: string,
  ): Promise<WorkShiftResponseDto> {
    return firstValueFrom(
      this.collaboratorsClientKafka.send('collaborators.find.one.workShift', {
        workShiftId,
      }),
    );
  }

  @Post()
  async save(
    @Body() request: CreateWorkShiftDto,
  ): Promise<WorkShiftResponseDto> {
    return firstValueFrom(
      this.collaboratorsClientKafka.send(
        'collaborators.save.workShift',
        request,
      ),
    );
  }

  @Patch()
  async update(
    @Body() request: UpdateWorkShiftDto,
  ): Promise<WorkShiftResponseDto> {
    return firstValueFrom(
      this.collaboratorsClientKafka.send(
        'collaborators.update.workShift',
        request,
      ),
    );
  }

  @Delete()
  async remove(
    @Param('id') workShiftId: string,
  ): Promise<DeleteResultResponse> {
    return firstValueFrom(
      this.collaboratorsClientKafka.send('collaborators.remove.workShift', {
        workShiftId,
      }),
    );
  }
}
