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
import { firstValueFrom } from 'rxjs';
import { ErrorInterceptor } from 'src/common/interceptors';
import { COLLABORATORS_MS } from 'src/config';
import { CreatePositionDto, UpdatePositionDto } from './dto/request';
import { PositionResponseDto } from './dto/response';

@Controller('positions')
@UseInterceptors(ErrorInterceptor)
export class PositionsController {
  constructor(
    @Inject(COLLABORATORS_MS) private readonly collaboratorsClient: ClientProxy,
  ) {}

  @Get()
  findAll(): Promise<PositionResponseDto[]> {
    return firstValueFrom(
      this.collaboratorsClient.send({ cmd: 'find.all.positions' }, {}),
    );
  }

  @Get(':id')
  findOneById(@Param('id') id: string): Promise<PositionResponseDto> {
    return firstValueFrom(
      this.collaboratorsClient.send(
        { cmd: 'find.one.positions.by.id' },
        { id },
      ),
    );
  }

  @Post()
  save(@Body() request: CreatePositionDto): Promise<PositionResponseDto> {
    return firstValueFrom(
      this.collaboratorsClient.send({ cmd: 'save.position' }, request),
    );
  }

  @Patch()
  update(@Body() request: UpdatePositionDto): Promise<PositionResponseDto> {
    return firstValueFrom(
      this.collaboratorsClient.send({ cmd: 'update.position' }, request),
    );
  }

  @Delete(':id')
  deleteById(@Param('id') id: string): Promise<PositionResponseDto> {
    return firstValueFrom(
      this.collaboratorsClient.send({ cmd: 'delete.position.by.id' }, { id }),
    );
  }
}
