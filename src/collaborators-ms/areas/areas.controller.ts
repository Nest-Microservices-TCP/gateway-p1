import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { COLLABORATORS_MS } from 'src/config';
import { CreateAreaDto, UpdateAreaDto } from './dto/request';
import { firstValueFrom } from 'rxjs';
import { ErrorInterceptor } from 'src/common/interceptors';
import { AreaResponseDto } from './dto/response';

@UseInterceptors(ErrorInterceptor)
@Controller('areas')
export class AreasController {
  constructor(
    @Inject(COLLABORATORS_MS)
    private readonly collaboratorsClient: ClientProxy,
  ) {}

  @Post()
  save(@Body() request: CreateAreaDto): Promise<AreaResponseDto> {
    return firstValueFrom(
      this.collaboratorsClient.send({ cmd: 'save.area' }, request),
    );
  }

  @Get()
  findAll(): Promise<AreaResponseDto[]> {
    return firstValueFrom(
      this.collaboratorsClient.send({ cmd: 'find.all.areas' }, {}),
    );
  }

  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<AreaResponseDto> {
    return firstValueFrom(
      this.collaboratorsClient.send({ cmd: 'find.one.area.by.id' }, { id }),
    );
  }

  @Patch()
  update(@Body() request: UpdateAreaDto): Promise<AreaResponseDto> {
    return firstValueFrom(
      this.collaboratorsClient.send({ cmd: 'update.area' }, request),
    );
  }

  @Delete(':id')
  deleteById(@Param('id') id: string): Promise<AreaResponseDto> {
    return firstValueFrom(
      this.collaboratorsClient.send({ cmd: 'delete.area.by.id' }, { id }),
    );
  }
}
