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
import { CreateAreaDto, UpdateAreaDto } from './dto';
import { firstValueFrom } from 'rxjs';
import { ErrorInterceptor } from 'src/common/interceptors';

@UseInterceptors(ErrorInterceptor)
@Controller('areas')
export class AreasController {
  constructor(
    @Inject(COLLABORATORS_MS)
    private readonly collaboratorsClient: ClientProxy,
  ) {}

  @Post()
  save(@Body() request: CreateAreaDto) {
    return firstValueFrom(
      this.collaboratorsClient.send({ cmd: 'save.area' }, request),
    );
  }

  @Get()
  findAll() {
    return firstValueFrom(
      this.collaboratorsClient.send({ cmd: 'find.all.areas' }, {}),
    );
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return firstValueFrom(
      this.collaboratorsClient.send({ cmd: 'find.one.area.by.id' }, { id }),
    );
  }

  @Patch()
  update(@Body() request: UpdateAreaDto) {
    return firstValueFrom(
      this.collaboratorsClient.send({ cmd: 'update.area' }, request),
    );
  }

  @Delete(':id')
  deleteById(@Param('id') id: string) {
    console.log(id);
    return firstValueFrom(
      this.collaboratorsClient.send({ cmd: 'delete.area.by.id' }, { id }),
    );
  }
}
