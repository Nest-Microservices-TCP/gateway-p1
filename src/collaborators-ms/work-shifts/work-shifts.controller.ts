import {
  Get,
  Post,
  Body,
  Param,
  Inject,
  Controller,
  ParseUUIDPipe,
  UseInterceptors,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ErrorInterceptor } from 'src/common/interceptors';

import {
  WorkShift,
  WorkShiftsServiceClient,
} from 'src/grpc/collaborators/work_shifts.pb';

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

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) work_shift_id: string,
  ): Promise<WorkShift> {
    return await firstValueFrom(
      this.workShiftsGrpcClient.findOne({ work_shift_id }),
    );
  }

  @Get()
  async find(): Promise<WorkShift[]> {
    const { work_shifts } = await firstValueFrom(
      this.workShiftsGrpcClient.find({}),
    );

    return work_shifts;
  }
}
