import {
  IsUUID,
  IsString,
  MaxLength,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';

export class UpdateReservationStateDto {
  @IsUUID()
  reservationStateId: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @IsOptional()
  name?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;
}
