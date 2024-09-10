import {
  IsUUID,
  IsPositive,
  IsOptional,
  IsNumber,
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
