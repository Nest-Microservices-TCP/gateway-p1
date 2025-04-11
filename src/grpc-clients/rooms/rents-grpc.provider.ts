import {
  Transport,
  ClientGrpcProxy,
  ClientProxyFactory,
} from '@nestjs/microservices';
import { Provider } from '@nestjs/common';

import { envs } from 'src/config';

import {
  RentsServiceClient,
  RENTS_SERVICE_NAME,
  ROOMS_RENTS_PACKAGE_NAME,
} from 'src/grpc/proto-files/rooms/rents.pb';

export const RENTS_GRPC_CLIENT = RENTS_SERVICE_NAME;

export const RentsGrpcProvider: Provider = {
  provide: RENTS_GRPC_CLIENT,
  useFactory: (): RentsServiceClient => {
    const client: ClientGrpcProxy = ClientProxyFactory.create({
      transport: Transport.GRPC,
      options: {
        url: `${envs.roomsMicroserviceHost}:${envs.roomsMicroservicePort}`,
        protoPath: './proto-files/rooms/rents.proto',
        package: ROOMS_RENTS_PACKAGE_NAME,
        loader: {
          keepCase: true,
          enums: String,
          arrays: true,
        },
      },
    });

    return client.getService<RentsServiceClient>(RENTS_SERVICE_NAME);
  },
};
