import { ArrayMinSize, IsArray, IsUUID } from 'class-validator';
import { FindReservationsOriginsByIdsRequest } from 'src/grpc/rooms/reservations_origins.pb';

export class FindReservationsOriginsByIdsDto
  implements FindReservationsOriginsByIdsRequest
{
  @IsArray()
  @IsUUID('4', { each: true })
  @ArrayMinSize(1)
  reservations_origins_ids: string[];
}
