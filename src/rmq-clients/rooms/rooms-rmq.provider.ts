import { Transport, ClientProxyFactory } from '@nestjs/microservices';
import { Provider } from '@nestjs/common';

import { envs } from 'src/config';

const RENTS_RMQ_CLIENT = 'RENTS_RMQ_CLIENT';

export const RentsRMQProvider: Provider = {
  provide: RENTS_RMQ_CLIENT,
  useFactory: (): ClientProxyFactory => {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${envs.rabbitMqHost}:${envs.rabbitMqPort}`],
        queue: 'rent-events-queue', // Nombre de la cola
        queueOptions: {
          durable: false,
        },
      },
    });
  },
};
