import {
  Transport,
  ClientGrpcProxy,
  ClientProxyFactory,
} from '@nestjs/microservices';
import { Provider } from '@nestjs/common';

import { envs } from 'src/config';

import {
  RoomsServiceClient,
  ROOMS_SERVICE_NAME,
  ROOMS_ROOMS_PACKAGE_NAME,
} from 'src/grpc/proto-files/rooms/rooms.pb';

export const ROOMS_GRPC_CLIENT = ROOMS_SERVICE_NAME;

export const RoomsGrpcProvider: Provider = {
  provide: ROOMS_GRPC_CLIENT,
  useFactory: (): RoomsServiceClient => {
    const client: ClientGrpcProxy = ClientProxyFactory.create({
      transport: Transport.GRPC,
      options: {
        url: `${envs.roomsMicroserviceHost}:${envs.roomsMicroservicePort}`,
        protoPath: './proto-files/rooms/rooms.proto',
        package: ROOMS_ROOMS_PACKAGE_NAME,
        loader: {
          keepCase: true,
          enums: String,
          arrays: true,
        },
      },
    });

    return client.getService<RoomsServiceClient>(ROOMS_SERVICE_NAME);
  },
};
