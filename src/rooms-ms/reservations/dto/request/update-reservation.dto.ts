import { ReservationOrigin, ReservationState } from '../../enum';
import {
  Min,
  IsDate,
  IsEnum,
  IsUUID,
  IsNumber,
  IsPositive,
  IsOptional,
} from 'class-validator';

export class UpdateReservationDto {
  @IsUUID('4')
  reservationId: string;

  @IsDate()
  @IsOptional()
  @IsOptional()
  checkoutDate?: Date;

  @IsDate()
  @IsOptional()
  @IsOptional()
  departureDate?: Date;

  @IsNumber()
  @IsPositive()
  @Min(1)
  @IsOptional()
  peopleQuantity?: number;

  @IsEnum(ReservationState)
  state?: ReservationState;

  @IsNumber()
  @IsPositive()
  @Min(1)
  @IsOptional()
  total?: number;

  @IsEnum(ReservationOrigin)
  @IsOptional()
  origin?: ReservationOrigin;

  @IsNumber()
  @IsPositive()
  @Min(0)
  @IsOptional()
  balance: number;
}
