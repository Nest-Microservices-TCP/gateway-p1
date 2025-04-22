import {
  Min,
  IsEnum,
  Matches,
  IsNumber,
  IsString,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';
import { AccommodationType, CreateRateRequest } from 'src/grpc/rooms/rates.pb';

export class CreateRateDto implements CreateRateRequest {
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
  accommodation_cost: number;

  @IsNumber()
  @Min(1, { message: 'The minimum value for extra accommodation cost is 1 ' })
  extra_accommodation_cost: number;

  @IsNumber()
  @Min(1, { message: 'The minimum value for overtime cost is 1 ' })
  overtime_cost: number;

  @IsNumber()
  @Min(1, { message: 'The minimum value for extra people cost is 1 ' })
  extra_people_cost: number;

  @IsNumber()
  @Min(1, { message: 'The minimum value for early check_in cost is 1 ' })
  early_check_in_cost: number;

  @IsEnum(AccommodationType)
  accommodation_type: AccommodationType;

  @IsNotEmpty({ message: 'The rate duration cannot be empty' })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)?$/, {
    message: 'The check_in hour must be in the format HH:mm',
  })
  @IsString({ message: 'The check_in hour must be a string' })
  check_in_hour: string;

  @IsNotEmpty({ message: 'The rate duration cannot be empty' })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)?$/, {
    message: 'The checkout hour must be in the format HH:mm',
  })
  @IsString({ message: 'The checkout hour must be a string' })
  checkout_hour: string;
}
