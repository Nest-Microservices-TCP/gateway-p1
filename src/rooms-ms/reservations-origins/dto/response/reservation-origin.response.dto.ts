import { Expose } from 'class-transformer';

export class ReservationOriginResponseDto {
  @Expose()
  reservationOriginId: string;

  @Expose()
  name: string;

  @Expose()
  description: string;
}
