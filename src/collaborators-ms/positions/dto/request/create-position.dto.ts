import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { CreatePositionRequest } from 'src/grpc/proto-files/collaborators/positions.pb';

export class CreatePositionDto implements CreatePositionRequest {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}
