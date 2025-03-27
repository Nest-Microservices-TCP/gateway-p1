import { Controller, UseInterceptors } from '@nestjs/common';

import { ErrorInterceptor } from 'src/common/interceptors';

@Controller('payments')
@UseInterceptors(ErrorInterceptor)
export class PaymentsController {
  constructor() {}
}
