import { CreateWorkShiftDto, UpdateWorkShiftDto } from './dto/request';
import { DeleteResultResponse } from 'src/common/dto/response';
import { ErrorInterceptor } from 'src/common/interceptors';
import { WorkShiftResponseDto } from './dto/response';
import { ClientProxy } from '@nestjs/microservices';
import { COLLABORATORS_MS } from 'src/config';
import { firstValueFrom } from 'rxjs';
import {
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Inject,
  Controller,
  UseInterceptors,
} from '@nestjs/common';

@UseInterceptors(ErrorInterceptor)
@Controller('work-shifts')
export class WorkShiftsController {
  constructor(
    @Inject(COLLABORATORS_MS)
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
