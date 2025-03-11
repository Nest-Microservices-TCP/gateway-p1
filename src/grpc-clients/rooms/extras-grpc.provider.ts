import { Provider } from '@nestjs/common';
import {
  Transport,
  ClientGrpcProxy,
  ClientProxyFactory,
} from '@nestjs/microservices';

import { envs } from 'src/config';

import {
  EXTRAS_SERVICE_NAME,
  ExtrasServiceClient,
  ROOMS_EXTRAS_PACKAGE_NAME,
} from 'src/grpc/proto/rooms/extras.pb';

export const EXTRAS_GRPC_CLIENT = EXTRAS_SERVICE_NAME;

export const ExtrasGrpcProvider: Provider = {
  provide: EXTRAS_GRPC_CLIENT,
  useFactory: (): ExtrasServiceClient => {
    const client: ClientGrpcProxy = ClientProxyFactory.create({
      transport: Transport.GRPC,
      options: {
        url: `${envs.roomsHost}:${envs.roomsPort}`,
        protoPath: './proto/rooms/extras.proto',
        package: ROOMS_EXTRAS_PACKAGE_NAME,
        loader: {
          keepCase: true,
          enums: String,
          arrays: true,
        },
      },
    });

    return client.getService<ExtrasServiceClient>(EXTRAS_SERVICE_NAME);
  },
};
