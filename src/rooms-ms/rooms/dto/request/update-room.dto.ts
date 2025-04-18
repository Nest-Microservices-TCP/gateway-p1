import {
  IsUUID,
  IsNumber,
  IsPositive,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';

export class UpdateRoomDto {
  @IsUUID()
  @IsNotEmpty()
  roomId: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  number?: number;
}
