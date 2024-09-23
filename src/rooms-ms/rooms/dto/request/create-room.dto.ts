import { IsNumber, IsPositive } from 'class-validator';

export class CreateRoomDto {
  @IsNumber()
  @IsPositive()
  number: number;
}
