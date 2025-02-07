import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';
import { AccommodationType, EntryType } from '../../enum';

export class CreateRentDto {
  @IsString()
  @MaxLength(255)
  @IsOptional()
  guestName?: string;

  @IsEnum(AccommodationType)
  accommodationType: AccommodationType;

  @IsEnum(EntryType)
  entryType: EntryType;

  @IsNumber()
  @IsPositive()
  @Min(1)
  guestsNumber: number;

  @IsNumber()
  @IsPositive()
  @Min(1)
  @IsOptional()
  extraAccommodations?: number;

  @IsNumber()
  @IsPositive()
  @Min(1)
  @IsOptional()
  extraPeople?: number;

  @IsNumber()
  @IsPositive()
  @Min(1)
  @IsOptional()
  overtime?: number;

  @IsBoolean()
  @IsOptional()
  earlyCheckIn?: boolean = false;

  @IsUUID('4')
  rateId: string;
}
