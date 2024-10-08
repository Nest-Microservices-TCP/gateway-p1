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
import { COLLABORATORS_MS } from 'src/config';
import { WorkShiftResponseDto } from './dto/response';
import { firstValueFrom } from 'rxjs';
import { CreateWorkShiftDto, UpdateWorkShiftDto } from './dto/request';
import { ErrorInterceptor } from 'src/common/interceptors';

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
  findOneById(@Param('id') workShiftId: string): Promise<WorkShiftResponseDto> {
    return firstValueFrom(
      this.collaboratorsClient.send(
        { cmd: 'find.one.work.shift.by.id' },
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
  deleteById(@Param('id') workShiftId: string): Promise<WorkShiftResponseDto> {
    return firstValueFrom(
      this.collaboratorsClient.send(
        { cmd: 'delete.work.shift.by.id' },
        { workShiftId },
      ),
    );
  }
}
