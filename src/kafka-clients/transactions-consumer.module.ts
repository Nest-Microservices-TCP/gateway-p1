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
            clientId: envs.transactionsKafkaClientId,
            brokers: [envs.kafkaBroker],
          },
          consumer: {
            groupId: envs.transactionsKafkaGroupId,
          },
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class TransactionsKafkaClientModule {}

// Configuración sincrona como Provider
// import { Provider } from '@nestjs/common';
// import { ClientsModule, Transport } from '@nestjs/microservices';
// import { envs } from 'src/config';

// export const TRANSACTIONS_KAFKA_CLIENT = 'TRANSACTIONS_KAFKA_CLIENT';

// export const KafkaClientsProvider: Provider = {
//   provide: TRANSACTIONS_KAFKA_CLIENT,
//   useValue: ClientsModule.register([
//     {
//       name: TRANSACTIONS_KAFKA_CLIENT,
//       transport: Transport.KAFKA,
//       options: {
//         client: {
//           clientId: envs.transactionsKafkaClientId,  // Client ID específico
//           brokers: [envs.kafkaBroker],  // Brokers de Kafka
//         },
//         consumer: {
//           groupId: envs.transactionsKafkaGroupId,  // Grupo de consumidores
//         },
//       },
//     },
//   ]),
// };
