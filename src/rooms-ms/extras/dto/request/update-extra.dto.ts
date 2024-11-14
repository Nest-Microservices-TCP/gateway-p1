import {
  IsUUID,
  IsString,
  MaxLength,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';

export class UpdateExtraDto {
  @IsUUID()
  extraId: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @IsOptional()
  name?: string;
}
