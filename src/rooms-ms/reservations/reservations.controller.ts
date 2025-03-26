import { Controller, UseInterceptors } from '@nestjs/common';
import { ErrorInterceptor } from 'src/common/interceptors';

@Controller('reservations')
@UseInterceptors(ErrorInterceptor)
export class ReservationsController {
  constructor() {}
}
