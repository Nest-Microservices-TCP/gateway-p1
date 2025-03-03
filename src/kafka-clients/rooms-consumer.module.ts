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
            clientId: envs.roomsKafkaClientId,
            brokers: [envs.kafkaBroker],
          },
          consumer: {
            groupId: envs.roomsKafkaGroupId,
          },
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class RoomsKafkaClientModule {}
