import { ArrayMinSize, IsArray, IsUUID } from 'class-validator';
import { FindAmenitiesByIdsRequest } from 'src/grpc/rooms/amenities.pb';

export class FindAmenitiesByIdsDto implements FindAmenitiesByIdsRequest {
  @IsArray()
  @IsUUID('4', { each: true })
  @ArrayMinSize(1)
  amenities_ids: string[];
}
