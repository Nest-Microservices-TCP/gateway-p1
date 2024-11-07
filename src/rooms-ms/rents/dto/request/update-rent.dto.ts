import { AccommodationType, EntryType, RentState } from '../../enum';
import {
  Min,
  IsUUID,
  IsDate,
  IsEnum,
  IsNumber,
  IsString,
  MaxLength,
  IsPositive,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';

export class UpdateRentDto {
  @IsUUID()
  rentId: string;

  @IsDate()
  @IsOptional()
  checkoutDate?: Date;

  @IsDate()
  @IsOptional()
  departureAt?: Date;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Min(1)
  guests: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Min(1)
  extraAccommodations: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Min(1)
  extraPeople: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Min(1)
  overtime: number;

  @IsEnum(EntryType)
  @IsOptional()
  entryType: EntryType;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Min(1)
  totalIncome: number;

  @IsEnum(RentState)
  @IsOptional()
  rentState: RentState;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @IsOptional()
  guestName: string;

  @IsEnum(AccommodationType)
  @IsOptional()
  accommodationType: AccommodationType;

  subtotals: string; //TODO: es un jsonb, revisar una mejor forma

  @IsUUID()
  @IsOptional()
  roomId: string;

  @IsUUID()
  @IsOptional()
  rateId: string;

  @IsUUID()
  @IsOptional()
  hotelId: string;
}
