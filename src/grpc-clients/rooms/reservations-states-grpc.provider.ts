import {
  Transport,
  ClientGrpcProxy,
  ClientProxyFactory,
} from '@nestjs/microservices';
import { Provider } from '@nestjs/common';

import { envs } from 'src/config';

import {
  ReservationsStatesServiceClient,
  RESERVATIONS_STATES_SERVICE_NAME,
  ROOMS_RESERVATIONS_STATES_PACKAGE_NAME,
} from 'src/grpc/proto-files/rooms/reservations_states.pb';

export const RESERVATIONS_STATES_GRPC_CLIENT = RESERVATIONS_STATES_SERVICE_NAME;

export const ReservationsStatesGrpcProvider: Provider = {
  provide: RESERVATIONS_STATES_GRPC_CLIENT,
  useFactory: (): ReservationsStatesServiceClient => {
    const client: ClientGrpcProxy = ClientProxyFactory.create({
      transport: Transport.GRPC,
      options: {
        url: `${envs.roomsMicroserviceHost}:${envs.roomsMicroservicePort}`,
        protoPath: './proto-files/rooms/reservations_states.proto',
        package: ROOMS_RESERVATIONS_STATES_PACKAGE_NAME,
        loader: {
          keepCase: true,
          enums: String,
          arrays: true,
        },
      },
    });

    return client.getService<ReservationsStatesServiceClient>(
      RESERVATIONS_STATES_SERVICE_NAME,
    );
  },
};
