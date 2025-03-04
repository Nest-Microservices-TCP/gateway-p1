import { firstValueFrom } from 'rxjs';
import { Controller, Get, Inject } from '@nestjs/common';

import {
  Amenity,
  AmenitiesServiceClient,
} from 'src/grpc/proto/rooms/amenities.pb';

import { AMENITIES_GRPC_CLIENT } from 'src/grpc-clients/rooms';

@Controller('amenities')
export class AmenitiesController {
  constructor(
    @Inject(AMENITIES_GRPC_CLIENT)
    private readonly amenitiesGrpcClient: AmenitiesServiceClient,
  ) {}

  @Get()
  async findAll(): Promise<Amenity[]> {
    const { amenities } = await firstValueFrom(
      this.amenitiesGrpcClient.listAmenities({}),
    );

    return amenities;
  }
}
