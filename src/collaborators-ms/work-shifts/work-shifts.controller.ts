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
    this.collaboratorsClientKafka.subscribeToResponseOf('workShifts.find.all');
    this.collaboratorsClientKafka.subscribeToResponseOf('workShifts.find.one');
    this.collaboratorsClientKafka.subscribeToResponseOf('workShifts.save');
    this.collaboratorsClientKafka.subscribeToResponseOf('workShifts.update');
    this.collaboratorsClientKafka.subscribeToResponseOf('workShifts.remove');
  }

  @Get()
  async findAll(): Promise<WorkShiftResponseDto[]> {
    return firstValueFrom(
      this.collaboratorsClientKafka.send('workShifts.find.all', {}),
    );
  }

  @Get(':id')
  async findOne(
    @Param('id') workShiftId: string,
  ): Promise<WorkShiftResponseDto> {
    return firstValueFrom(
      this.collaboratorsClientKafka.send('workShifts.find.one', {
        workShiftId,
      }),
    );
  }

  @Post()
  async save(
    @Body() request: CreateWorkShiftDto,
  ): Promise<WorkShiftResponseDto> {
    return firstValueFrom(
      this.collaboratorsClientKafka.send('workShifts.save', request),
    );
  }

  @Patch()
  async update(
    @Body() request: UpdateWorkShiftDto,
  ): Promise<WorkShiftResponseDto> {
    return firstValueFrom(
      this.collaboratorsClientKafka.send('workShifts.update', request),
    );
  }

  @Delete()
  async remove(
    @Param('id') workShiftId: string,
  ): Promise<DeleteResultResponse> {
    return firstValueFrom(
      this.collaboratorsClientKafka.send('workShifts.remove', {
        workShiftId,
      }),
    );
  }
}
