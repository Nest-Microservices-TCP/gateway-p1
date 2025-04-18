import { IsOptional, IsString, MaxLength } from 'class-validator';
import { CreateAmenityRequest } from 'src/grpc/rooms/amenities.pb';

export class CreateAmenityDto implements CreateAmenityRequest {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  description?: string;
}
