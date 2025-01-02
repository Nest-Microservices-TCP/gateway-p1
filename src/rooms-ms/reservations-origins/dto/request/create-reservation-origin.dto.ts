import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateReservationOriginDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;
}
