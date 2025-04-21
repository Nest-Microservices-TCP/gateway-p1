import { ArrayMinSize, IsArray, IsUUID } from 'class-validator';
import { FindWorkShiftsByIdsRequest } from 'src/grpc/collaborators/work_shifts.pb';

export class FindWorkShiftsByIdsDto implements FindWorkShiftsByIdsRequest {
  @IsArray()
  @IsUUID('4', { each: true })
  @ArrayMinSize(1)
  work_shifts_ids: string[];
}
