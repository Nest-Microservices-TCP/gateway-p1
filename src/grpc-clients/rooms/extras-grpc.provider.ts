import { Provider } from '@nestjs/common';
import {
  Transport,
  ClientGrpcProxy,
  ClientProxyFactory,
} from '@nestjs/microservices';

import { join } from 'path';
import { envs } from 'src/config';

import {
  ExtrasServiceClient,
  EXTRAS_SERVICE_NAME,
  ROOMS_EXTRAS_PACKAGE_NAME,
} from 'src/grpc/rooms/extras.pb';

export const EXTRAS_GRPC_CLIENT = EXTRAS_SERVICE_NAME;

export const ExtrasGrpcProvider: Provider = {
  provide: EXTRAS_GRPC_CLIENT,
  useFactory: (): ExtrasServiceClient => {
    const client: ClientGrpcProxy = ClientProxyFactory.create({
      transport: Transport.GRPC,
      options: {
        url: `${envs.roomsMicroserviceHost}:${envs.roomsMicroservicePort}`,
        protoPath: [join(__dirname, '../../../proto-files/rooms/extras.proto')],
        package: ROOMS_EXTRAS_PACKAGE_NAME,
        loader: {
          includeDirs: [join(__dirname, '../../../proto-files')],
          keepCase: true,
          enums: String,
          arrays: true,
        },
      },
    });

    return client.getService<ExtrasServiceClient>(EXTRAS_SERVICE_NAME);
  },
};
