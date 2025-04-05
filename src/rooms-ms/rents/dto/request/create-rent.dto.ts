import {
  IsEnum,
  IsUUID,
  IsArray,
  IsString,
  MaxLength,
  IsBoolean,
  IsOptional,
  ArrayMinSize,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AccommodationType, EntryType } from '../../enum';
import { CreateRentExtraDto } from 'src/rooms-ms/rents-extras/dto/request/create-rent-extra.dto';

export class CreateRentDto {
  @IsUUID('4')
  rate_id: string;

  @IsUUID('4')
  room_id: string;

  @IsString()
  @MaxLength(100)
  @IsOptional()
  guest_name?: string;

  @IsEnum(AccommodationType)
  @IsOptional()
  accommodation_type: AccommodationType = AccommodationType.HOTEL;

  @IsEnum(EntryType)
  @IsOptional()
  entry_type: EntryType = EntryType.WALKING;

  @IsBoolean()
  @IsOptional()
  early_check_in: boolean = false;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateRentExtraDto)
  @IsOptional()
  rent_extras?: CreateRentExtraDto[];
}
