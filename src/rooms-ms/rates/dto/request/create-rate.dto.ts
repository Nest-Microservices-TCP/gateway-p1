import { AccommodationType } from 'src/rooms-ms/rents/enum';
import {
  Min,
  IsEnum,
  Matches,
  IsNumber,
  IsString,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';

export class CreateRateDto {
  @IsString({ message: 'The rate name must be a string' })
  @IsNotEmpty({ message: 'The rate name cannot be empty' })
  @MaxLength(255, {
    message: 'The rate name cannot be longer than 255 characters',
  })
  name: string;

  @IsNotEmpty({ message: 'The rate duration cannot be empty' })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)?$/, {
    message: 'The checkout hour must be in the format HH:mm',
  })
  @IsString({ message: 'The rate duration must be a string' })
  duration: string;

  @IsNumber()
  @Min(1, { message: 'The minimum value for accommodation cost is 1 ' })
  accommodationCost: number;

  @IsNumber()
  @Min(1, { message: 'The minimum value for extra accommodation cost is 1 ' })
  extraAccommodationCost: number;

  @IsNumber()
  @Min(1, { message: 'The minimum value for overtime cost is 1 ' })
  overtimeCost: number;

  @IsNumber()
  @Min(1, { message: 'The minimum value for extra people cost is 1 ' })
  extraPeopleCost: number;

  @IsNumber()
  @Min(1, { message: 'The minimum value for early checkin cost is 1 ' })
  earlyCheckinCost: number;

  @IsEnum(AccommodationType)
  accommodationType: AccommodationType;

  @IsNotEmpty({ message: 'The rate duration cannot be empty' })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)?$/, {
    message: 'The checkin hour must be in the format HH:mm',
  })
  @IsString({ message: 'The checkin hour must be a string' })
  checkInHour: string;

  @IsNotEmpty({ message: 'The rate duration cannot be empty' })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)?$/, {
    message: 'The checkout hour must be in the format HH:mm',
  })
  @IsString({ message: 'The checkout hour must be a string' })
  checkoutHour: string;
}
