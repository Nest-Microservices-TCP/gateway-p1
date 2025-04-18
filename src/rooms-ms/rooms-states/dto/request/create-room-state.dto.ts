import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateRoomStateRequest } from 'src/grpc/rooms/rooms_states.pb';

export class CreateRoomStateDto implements CreateRoomStateRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}
