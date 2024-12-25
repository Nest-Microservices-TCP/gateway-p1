import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateReservationStateDto {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;
}
