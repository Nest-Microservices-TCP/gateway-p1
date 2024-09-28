import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { COLLABORATORS_MS } from 'src/config';
import { WorkShiftResponseDto } from './dto/response';
import { firstValueFrom } from 'rxjs';

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
}
