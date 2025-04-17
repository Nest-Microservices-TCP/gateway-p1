import { IsBoolean, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { CreateWorkShiftRequest } from 'src/grpc/collaborators/work_shifts.pb';

export class CreateWorkShiftDto implements CreateWorkShiftRequest {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsString()
  @IsNotEmpty()
  check_in_time: string;

  @IsString()
  @IsNotEmpty()
  departure_time: string;

  @IsBoolean()
  @IsNotEmpty()
  is_shift_open: boolean;
}
