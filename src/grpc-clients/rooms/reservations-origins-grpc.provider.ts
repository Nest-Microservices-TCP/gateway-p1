import {
  Transport,
  ClientGrpcProxy,
  ClientProxyFactory,
} from '@nestjs/microservices';
import { Provider } from '@nestjs/common';

import { envs } from 'src/config';

import {
  RESERVATIONS_ORIGINS_SERVICE_NAME,
  ReservationsOriginsServiceClient,
  ROOMS_RESERVATIONS_ORIGINS_PACKAGE_NAME,
} from 'src/grpc/proto/rooms/reservations_origins.pb';

export const RESERVATIONS_ORIGINS_GRPC_CLIENT =
  RESERVATIONS_ORIGINS_SERVICE_NAME;

export const ReservationsOriginsGrpcProvider: Provider = {
  provide: RESERVATIONS_ORIGINS_GRPC_CLIENT,
  useFactory: (): ReservationsOriginsServiceClient => {
    const client: ClientGrpcProxy = ClientProxyFactory.create({
      transport: Transport.GRPC,
      options: {
        url: `${envs.roomsMicroserviceHost}:${envs.roomsMicroservicePort}`,
        protoPath: './proto/rooms/reservations_origins.proto',
        package: ROOMS_RESERVATIONS_ORIGINS_PACKAGE_NAME,
        loader: {
          keepCase: true,
          enums: String,
          arrays: true,
        },
      },
    });

    return client.getService<ReservationsOriginsServiceClient>(
      RESERVATIONS_ORIGINS_SERVICE_NAME,
    );
  },
};
