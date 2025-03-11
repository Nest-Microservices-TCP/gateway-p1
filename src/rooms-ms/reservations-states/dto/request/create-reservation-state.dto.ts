import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { CreateReservationStateRequest } from 'src/grpc/proto/rooms/reservations_states.pb';

export class CreateReservationStateDto
  implements CreateReservationStateRequest
{
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;
}
