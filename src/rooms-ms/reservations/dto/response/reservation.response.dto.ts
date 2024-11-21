import { ReservationOrigin, ReservationState } from '../../enum';
import { Expose } from 'class-transformer';

export class ReservationResponseDto {
  @Expose()
  reservationId: string;

  @Expose()
  checkoutDate: Date;

  @Expose()
  departureDate: Date;

  @Expose()
  peopleQuantity: number;

  @Expose()
  state: ReservationState;

  @Expose()
  total: number;

  @Expose()
  origin: ReservationOrigin;

  @Expose()
  balance: number;
}
