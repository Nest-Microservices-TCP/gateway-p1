import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { envs, TRANSACTIONS_KAFKA_CLIENT } from 'src/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: TRANSACTIONS_KAFKA_CLIENT,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: envs.TRANSACTIONS_KAFKA_CLIENT_ID,
            brokers: [envs.KAFKA_BROKER],
          },
          consumer: {
            groupId: envs.TRANSACTIONS_KAFKA_GROUP_ID,
          },
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class TransactionsKafkaClientModule {}
