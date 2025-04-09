import { Expose } from 'class-transformer';
import { Amenity } from 'src/grpc/proto-files/rooms/amenities.pb';

export class AmenityResponseDto implements Amenity {
  @Expose()
  amenity_id: string;

  @Expose()
  name: string;

  @Expose()
  description: string;
}
