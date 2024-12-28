import { Expose } from 'class-transformer';

export class ReservationStateResponseDto {
  @Expose()
  reservationStateId: string;

  @Expose()
  name: string;

  @Expose()
  description: string;
}
