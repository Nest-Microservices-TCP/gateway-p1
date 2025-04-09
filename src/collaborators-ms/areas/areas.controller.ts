import {
  Get,
  Body,
  Post,
  Param,
  Inject,
  Controller,
  ParseUUIDPipe,
  UseInterceptors,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ErrorInterceptor } from 'src/common/interceptors';

import {
  Area,
  AreasServiceClient,
} from 'src/grpc/proto-files/collaborators/areas.pb';

import { AREAS_GRPC_CLIENT } from 'src/grpc-clients/collaborators';

import { CreateAreaDto } from './dto/request';

@Controller('areas')
@UseInterceptors(ErrorInterceptor)
export class AreasController {
  constructor(
    @Inject(AREAS_GRPC_CLIENT)
    private readonly areasGrpcClient: AreasServiceClient,
  ) {}

  @Post()
  async save(@Body() request: CreateAreaDto): Promise<void> {
    await firstValueFrom(this.areasGrpcClient.save(request));
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) area_id: string): Promise<Area> {
    return await firstValueFrom(this.areasGrpcClient.findOne({ area_id }));
  }

  @Get()
  async find(): Promise<Area[]> {
    const { areas } = await firstValueFrom(this.areasGrpcClient.find({}));

    return areas;
  }
}
