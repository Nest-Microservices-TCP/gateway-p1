import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { CreateAreaRequest } from 'src/grpc/collaborators/areas.pb';

export class CreateAreaDto implements CreateAreaRequest {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;
}
