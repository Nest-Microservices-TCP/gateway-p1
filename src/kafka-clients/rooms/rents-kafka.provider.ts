import {
  Transport,
  ClientKafka,
  ClientProxyFactory,
} from '@nestjs/microservices';
import { Provider } from '@nestjs/common';

import { envs } from 'src/config';

const RENTS_KAFKA_CLIENT = 'RENTS_KAFKA_CLIENT';

export const RentsKafkaProvider: Provider = {
  provide: RENTS_KAFKA_CLIENT,
  useFactory: (): ClientKafka => {
    return ClientProxyFactory.create({
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'rents',
          brokers: [envs.kafkaBroker],
        },
        consumer: {
          groupId: 'rents-consumer',
        },
      },
    }) as ClientKafka;
  },
};
