import { ArrayMinSize, IsArray, IsUUID } from 'class-validator';
import { FindReservationsStatesByIdsRequest } from 'src/grpc/rooms/reservations_states.pb';

export class FindReservationsStatesByIdsDto
  implements FindReservationsStatesByIdsRequest
{
  @IsArray()
  @IsUUID('4', { each: true })
  @ArrayMinSize(1)
  reservations_states_ids: string[];
}
