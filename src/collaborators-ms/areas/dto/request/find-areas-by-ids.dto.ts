import { ArrayMinSize, IsArray, IsUUID } from 'class-validator';
import { FindAreasByIdsRequest } from 'src/grpc/collaborators/areas.pb';

export class FindAreasByIdsDto implements FindAreasByIdsRequest {
  @IsArray()
  @IsUUID('4', { each: true })
  @ArrayMinSize(1)
  areas_ids: string[];
}
