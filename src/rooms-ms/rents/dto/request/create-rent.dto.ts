import {
  IsEnum,
  IsUUID,
  IsArray,
  IsString,
  MaxLength,
  IsBoolean,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { RentExtra } from 'src/grpc/rooms/rents_extras.pb';
import { AccommodationType } from 'src/grpc/rooms/rates.pb';
import { CreateRentRequest, EntryType } from 'src/grpc/rooms/rents.pb';

import { RentExtraResponseDto } from 'src/rooms-ms/rents-extras/dto/response/rent-extra.response.dto';

export class CreateRentDto implements CreateRentRequest {
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
  @ValidateNested({ each: true })
  @Type(() => RentExtraResponseDto)
  rents_extras: RentExtra[];
}
