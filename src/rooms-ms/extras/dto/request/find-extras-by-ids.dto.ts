import { ArrayMinSize, IsArray, IsUUID } from 'class-validator';
import { FindExtrasByIdsRequest } from 'src/grpc/rooms/extras.pb';

export class FindExtrasByIdsDto implements FindExtrasByIdsRequest {
  @IsArray()
  @IsUUID('4', { each: true })
  @ArrayMinSize(1)
  extras_ids: string[];
}
