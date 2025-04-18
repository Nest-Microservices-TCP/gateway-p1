import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { CreateReservationOriginRequest } from 'src/grpc/rooms/reservations_origins.pb';

export class CreateReservationOriginDto
  implements CreateReservationOriginRequest
{
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @IsOptional()
  description?: string;
}
