import { Controller, Inject, UseInterceptors } from '@nestjs/common';
import { ErrorInterceptor } from 'src/common/interceptors';

import { WorkShiftsServiceClient } from 'src/grpc/proto/collaborators/work_shifts.pb';

import { WORK_SHIFTS_GRPC_CLIENT } from 'src/grpc-clients/collaborators';

@UseInterceptors(ErrorInterceptor)
@Controller('work-shifts')
export class WorkShiftsController {
  constructor(
    @Inject(WORK_SHIFTS_GRPC_CLIENT)
    private readonly workShiftsGrpcClient: WorkShiftsServiceClient,
  ) {}
}
