import { Controller, UseInterceptors } from '@nestjs/common';

import { ErrorInterceptor } from 'src/common/interceptors';

@Controller('extras')
@UseInterceptors(ErrorInterceptor)
export class ExtrasController {
  constructor() {}
}
