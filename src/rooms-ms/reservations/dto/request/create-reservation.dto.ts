import { IsDate, IsEnum, IsNumber, IsPositive, Min } from 'class-validator';
import { ReservationOrigin } from 'src/reservations/enum';

export class CreateReservationDto {
  @IsDate()
  checkoutDate: Date;

  @IsDate()
  departureDate: Date;

  @IsNumber()
  @IsPositive()
  @Min(1)
  peopleQuantity: number;

  @IsEnum(ReservationOrigin)
  origin: ReservationOrigin;
}
