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
} from 'src/grpc/proto/rooms/reservations_states.pb';

export const RESERVATIONS_STATES_GRPC_CLIENT = RESERVATIONS_STATES_SERVICE_NAME;

export const ReservationsStatesGrpcProvider: Provider = {
  provide: RESERVATIONS_STATES_GRPC_CLIENT,
  useFactory: (): ReservationsStatesServiceClient => {
    const client: ClientGrpcProxy = ClientProxyFactory.create({
      transport: Transport.GRPC,
      options: {
        url: `${envs.roomsHost}:${envs.roomsPort}`,
        protoPath: './proto/rooms/reservations_states.proto',
        package: ROOMS_RESERVATIONS_STATES_PACKAGE_NAME,
      },
    });

    return client.getService<ReservationsStatesServiceClient>(
      RESERVATIONS_STATES_SERVICE_NAME,
    );
  },
};
