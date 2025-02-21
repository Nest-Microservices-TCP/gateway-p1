import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  OnModuleInit,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { TRANSACTIONS_KAFKA_CLIENT } from 'src/config';

import { ErrorInterceptor } from 'src/common/interceptors';

import { DeleteResultResponse } from 'src/common/dto/response';
import { CreatePaymentDto, UpdatePaymentDto } from './dto/request';
import { PaymentResponseDto } from './dto/response';

@Controller('payments')
@UseInterceptors(ErrorInterceptor)
export class PaymentsController implements OnModuleInit {
  constructor(
    @Inject(TRANSACTIONS_KAFKA_CLIENT)
    private readonly transactionsClientKafka: ClientKafka,
  ) {}

  async onModuleInit() {
    this.transactionsClientKafka.subscribeToResponseOf('payments.find.all');

    this.transactionsClientKafka.subscribeToResponseOf('payments.find.one');
    this.transactionsClientKafka.subscribeToResponseOf('payments.save');
    this.transactionsClientKafka.subscribeToResponseOf('payments.update');
    this.transactionsClientKafka.subscribeToResponseOf('payments.remove');
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
      this.transactionsClientKafka.send('payments.find.one', {
        paymentId,
      }),
    );
  }

  @Post()
  async save(@Body() request: CreatePaymentDto): Promise<PaymentResponseDto> {
    return firstValueFrom(
      this.transactionsClientKafka.send('payments.save', request),
    );
  }

  @Patch(':id')
  async update(@Body() request: UpdatePaymentDto): Promise<PaymentResponseDto> {
    return firstValueFrom(
      this.transactionsClientKafka.send('payments.update', request),
    );
  }

  @Delete(':id')
  async remove(@Param('id') paymentId: string): Promise<DeleteResultResponse> {
    return firstValueFrom(
      this.transactionsClientKafka.send(
        { cmd: 'payments.remove' },
        { paymentId },
      ),
    );
  }
}
