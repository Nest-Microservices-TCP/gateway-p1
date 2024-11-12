import { CreatePositionDto, UpdatePositionDto } from './dto/request';
import { DeleteResultResponse } from 'src/common/dto/response';
import { ErrorInterceptor } from 'src/common/interceptors';
import { PositionResponseDto } from './dto/response';
import { ClientProxy } from '@nestjs/microservices';
import { COLLABORATORS_MS } from 'src/config';
import { firstValueFrom } from 'rxjs';
import {
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Inject,
  Controller,
  UseInterceptors,
} from '@nestjs/common';

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
  findOneById(@Param('id') positionId: string): Promise<PositionResponseDto> {
    return firstValueFrom(
      this.collaboratorsClient.send(
        { cmd: 'find.one.positions.by.id' },
        { positionId },
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
  remove(@Param('id') positionId: string): Promise<DeleteResultResponse> {
    return firstValueFrom(
      this.collaboratorsClient.send(
        { cmd: 'remove.position.by.id' },
        { positionId },
      ),
    );
  }
}
