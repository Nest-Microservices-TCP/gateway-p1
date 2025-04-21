import { ArrayMinSize, IsArray, IsUUID } from 'class-validator';
import { FindPositionsByIdsRequest } from 'src/grpc/collaborators/positions.pb';

export class FindPositionsByIdsDto implements FindPositionsByIdsRequest {
  @IsArray()
  @IsUUID('4', { each: true })
  @ArrayMinSize(1)
  positions_ids: string[];
}
