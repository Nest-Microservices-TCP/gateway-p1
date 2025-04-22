import { ArrayMinSize, IsArray, IsUUID } from 'class-validator';
import { FindRoomsStatesByIdsRequest } from 'src/grpc/rooms/rooms_states.pb';

export class FindRoomsStatesByIdsDto implements FindRoomsStatesByIdsRequest {
  @IsArray()
  @IsUUID('4', { each: true })
  @ArrayMinSize(1)
  rooms_states_ids: string[];
}
