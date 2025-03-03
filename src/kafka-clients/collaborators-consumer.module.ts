import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { COLLABORATORS_KAFKA_CLIENT, envs } from 'src/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: COLLABORATORS_KAFKA_CLIENT,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: envs.collaboratorsKafkaClientId,
            brokers: [envs.kafkaBroker],
          },
          consumer: {
            groupId: envs.collaboratorsKafkaGroupId,
          },
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class CollaboratorsKafkaClientModule {}
