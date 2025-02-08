import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { envs, ROOMS_CLIENT_KAFKA } from 'src/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ROOMS_CLIENT_KAFKA,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: envs.ROOMS_KAFKA_CLIENT_ID,
            brokers: [envs.KAFKA_BROKER],
          },
          consumer: {
            groupId: envs.ROOMS_KAFKA_GROUP_ID,
          },
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class RoomsKafkaClientModule {}
