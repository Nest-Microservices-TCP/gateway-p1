import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateExtraDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;
}
