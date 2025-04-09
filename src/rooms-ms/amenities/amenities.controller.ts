import {
  Get,
  Post,
  Body,
  Param,
  Inject,
  Controller,
  ParseUUIDPipe,
  UseInterceptors,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ErrorInterceptor } from 'src/common/interceptors';

import {
  Amenity,
  AmenitiesServiceClient,
} from 'src/grpc/proto-files/rooms/amenities.pb';

import { AMENITIES_GRPC_CLIENT } from 'src/grpc-clients/rooms';

import { CreateAmenityDto } from './dto/request';

@Controller('amenities')
@UseInterceptors(ErrorInterceptor)
export class AmenitiesController {
  constructor(
    @Inject(AMENITIES_GRPC_CLIENT)
    private readonly amenitiesGrpcClient: AmenitiesServiceClient,
  ) {}

  @Post()
  async save(@Body() request: CreateAmenityDto): Promise<void> {
    await firstValueFrom(this.amenitiesGrpcClient.save(request));
  }

  @Get()
  async findAll(): Promise<Amenity[]> {
    const { amenities } = await firstValueFrom(
      this.amenitiesGrpcClient.find({}),
    );

    return amenities;
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) amenity_id: string,
  ): Promise<Amenity> {
    return firstValueFrom(this.amenitiesGrpcClient.findOne({ amenity_id }));
  }
}
