import {
  Post,
  Body,
  Inject,
  Controller,
  UseInterceptors,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ErrorInterceptor } from 'src/common/interceptors';

import { WorkShiftsServiceClient } from 'src/grpc/proto/collaborators/work_shifts.pb';

import { WORK_SHIFTS_GRPC_CLIENT } from 'src/grpc-clients/collaborators';

import { CreateWorkShiftDto } from './dto/request';

@Controller('work-shifts')
@UseInterceptors(ErrorInterceptor)
export class WorkShiftsController {
  constructor(
    @Inject(WORK_SHIFTS_GRPC_CLIENT)
    private readonly workShiftsGrpcClient: WorkShiftsServiceClient,
  ) {}

  @Post()
  async save(@Body() request: CreateWorkShiftDto): Promise<void> {
    await firstValueFrom(this.workShiftsGrpcClient.save(request));
  }
}
