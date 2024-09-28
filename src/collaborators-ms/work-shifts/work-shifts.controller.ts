import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { COLLABORATORS_MS } from 'src/config';
import { WorkShiftResponseDto } from './dto/response';
import { firstValueFrom } from 'rxjs';
import { CreateWorkShiftDto } from './dto/request';

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
  findOneById(@Param('id') id: string): Promise<WorkShiftResponseDto> {
    return firstValueFrom(
      this.collaboratorsClient.send(
        { cmd: 'find.one.work.shift.by.id' },
        { id },
      ),
    );
  }

  @Post()
  save(@Body() request: CreateWorkShiftDto): Promise<WorkShiftResponseDto> {
    return firstValueFrom(
      this.collaboratorsClient.send({ cmd: 'save.work.shift' }, request),
    );
  }
}
