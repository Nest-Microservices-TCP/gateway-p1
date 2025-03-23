import {
  IsUrl,
  IsString,
  IsNumber,
  MaxLength,
  IsOptional,
  IsPositive,
  IsNotEmpty,
} from 'class-validator';
import { CreateCollaboratorRequest } from 'src/grpc/proto/collaborators/collaborators.pb';

export class CreateCollaboratorDto implements CreateCollaboratorRequest {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  last_name: string;

  @IsString()
  @IsOptional()
  @MaxLength(25)
  phone?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  email?: string;

  @IsString()
  @IsOptional()
  direction?: string;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  salary?: number;

  @IsString()
  @IsOptional()
  @IsUrl()
  profile_photo?: string;
}
