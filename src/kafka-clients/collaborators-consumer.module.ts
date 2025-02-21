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
            clientId: envs.COLLABORATORS_KAFKA_CLIENT_ID,
            brokers: [envs.KAFKA_BROKER],
          },
          consumer: {
            groupId: envs.COLLABORATORS_KAFKA_GROUP_ID,
          },
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class CollaboratorsKafkaClientModule {}
