import { IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class UpdateRoomStateDto {
  @IsUUID()
  roomStateId: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  name?: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  description?: string;
}
