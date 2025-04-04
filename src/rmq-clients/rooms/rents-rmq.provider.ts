import { Provider } from '@nestjs/common';
import { Transport, ClientProxyFactory } from '@nestjs/microservices';

import { envs } from 'src/config';

export const RENTS_RMQ_CLIENT = 'RENTS_RMQ_CLIENT';

export const RentsRMQProvider: Provider = {
  provide: RENTS_RMQ_CLIENT,
  useFactory: (): ClientProxyFactory => {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [
          `amqp://${envs.rabbitMqUser}:${envs.rabbitMqPassword}@${envs.rabbitMqHost}:${envs.rabbitMqPort}`,
        ],
        queue: envs.rmqRentsQueue, // Nombre de la cola
        queueOptions: {
          durable: true,
        },
      },
    });
  },
};
