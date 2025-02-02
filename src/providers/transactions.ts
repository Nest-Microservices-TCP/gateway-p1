import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { envs, TRANSACTIONS_MS } from 'src/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: TRANSACTIONS_MS,
        transport: Transport.TCP,
        options: {
          host: envs.transactionsHost,
          port: envs.collaboratorsPort,
        },
      },
    ]),
  ],
  exports: [
    ClientsModule.register([
      {
        name: TRANSACTIONS_MS,
        transport: Transport.TCP,
        options: {
          host: envs.transactionsHost,
          port: envs.collaboratorsPort,
        },
      },
    ]),
  ],
})
export class TransactionsClientMS {}
