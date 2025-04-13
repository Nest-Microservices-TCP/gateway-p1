import {
  Transport,
  ClientGrpcProxy,
  ClientProxyFactory,
} from '@nestjs/microservices';
import { Provider } from '@nestjs/common';

import { join } from 'path';
import { envs } from 'src/config';

import {
  AreasServiceClient,
  AREAS_SERVICE_NAME,
  COLLABORATORS_AREAS_PACKAGE_NAME,
} from 'src/grpc/collaborators/areas.pb';

export const AREAS_GRPC_CLIENT = AREAS_SERVICE_NAME;

export const AreasGrpcProvider: Provider = {
  provide: AREAS_GRPC_CLIENT,
  useFactory: (): AreasServiceClient => {
    const client: ClientGrpcProxy = ClientProxyFactory.create({
      transport: Transport.GRPC,
      options: {
        url: `${envs.roomsMicroserviceHost}:${envs.roomsMicroservicePort}`,
        protoPath: [
          join(__dirname, '../../../proto-files/collaborators/areas.proto'),
        ],
        package: COLLABORATORS_AREAS_PACKAGE_NAME,
        loader: {
          includeDirs: [join(__dirname, '../../../proto-files')],
          keepCase: true,
          enums: String,
          arrays: true,
        },
      },
    });

    return client.getService<AreasServiceClient>(AREAS_SERVICE_NAME);
  },
};
