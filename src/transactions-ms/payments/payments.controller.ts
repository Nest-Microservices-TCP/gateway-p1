import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ClientKafka, ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { TRANSACTIONS_MICROSERVICE } from 'src/config';
import { TRANSACTIONS_KAFKA_CLIENT } from 'src/kafka-clients';

import { ErrorInterceptor } from 'src/common/interceptors';

import { DeleteResultResponse } from 'src/common/dto/response';
import { CreatePaymentDto, UpdatePaymentDto } from './dto/request';
import { PaymentResponseDto } from './dto/response';

@Controller('payments')
@UseInterceptors(ErrorInterceptor)
export class PaymentsController {
  constructor(
    @Inject(TRANSACTIONS_MICROSERVICE)
    private readonly transactionsClient: ClientProxy,
    @Inject(TRANSACTIONS_KAFKA_CLIENT)
    private readonly transactionsClientKafka: ClientKafka,
  ) {}

  async onModuleInit() {
    this.transactionsClientKafka.subscribeToResponseOf(
      'transactions.find.all.payments',
    );

    await this.transactionsClientKafka.connect();
  }

  @Get()
  async findAll() {
    return this.transactionsClientKafka.send(
      'transactions.find.all.payments',
      {},
    );
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) paymentId: string,
  ): Promise<PaymentResponseDto> {
    return firstValueFrom(
      this.transactionsClient.send({ cmd: 'find.one.payment' }, { paymentId }),
    );
  }

  @Post()
  async save(@Body() request: CreatePaymentDto): Promise<PaymentResponseDto> {
    return firstValueFrom(
      this.transactionsClient.send({ cmd: 'save.payment' }, request),
    );
  }

  @Patch(':id')
  async update(@Body() request: UpdatePaymentDto): Promise<PaymentResponseDto> {
    return firstValueFrom(
      this.transactionsClient.send({ cdm: 'update.payment' }, request),
    );
  }

  @Delete(':id')
  async remove(@Param('id') paymentId: string): Promise<DeleteResultResponse> {
    return firstValueFrom(
      this.transactionsClient.send({ cmd: 'remove.payment' }, { paymentId }),
    );
  }
}
