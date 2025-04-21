import { ArrayMinSize, IsArray, IsUUID } from 'class-validator';
import { FindCollaboratorsByIdsRequest } from 'src/grpc/collaborators/collaborators.pb';

export class FindCollaboratorsByIdsDto
  implements FindCollaboratorsByIdsRequest
{
  @IsArray()
  @IsUUID('4', { each: true })
  @ArrayMinSize(1)
  collaborators_ids: string[];
}
