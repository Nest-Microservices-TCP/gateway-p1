import { ArrayMinSize, IsArray, IsUUID } from 'class-validator';
import { FindRatesByIdsRequest } from 'src/grpc/rooms/rates.pb';

export class FindRatesByIdsDto implements FindRatesByIdsRequest {
  @IsArray()
  @IsUUID('4', { each: true })
  @ArrayMinSize(1)
  rates_ids: string[];
}
