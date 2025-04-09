import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { CreateAreaRequest } from 'src/grpc/proto-files/collaborators/areas.pb';

export class CreateAreaDto implements CreateAreaRequest {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;
}
