import { IsNumber, IsOptional, IsPositive, IsUUID, Min } from 'class-validator';

export class CreateRentExtraDto {
  @IsUUID('4')
  extra_id: string;

  @Min(1)
  @IsNumber()
  @IsPositive()
  @IsOptional()
  quantity: number;
}
