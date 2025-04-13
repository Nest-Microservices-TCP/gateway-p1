import {
  Transport,
  ClientGrpcProxy,
  ClientProxyFactory,
} from '@nestjs/microservices';
import { Provider } from '@nestjs/common';

import { join } from 'path';
import { envs } from 'src/config';

import {
  PositionsServiceClient,
  POSITIONS_SERVICE_NAME,
  COLLABORATORS_POSITIONS_PACKAGE_NAME,
} from 'src/grpc/collaborators/positions.pb';

export const POSITIONS_GRPC_CLIENT = POSITIONS_SERVICE_NAME;

export const PositionsGrpcProvider: Provider = {
  provide: POSITIONS_GRPC_CLIENT,
  useFactory: (): PositionsServiceClient => {
    const client: ClientGrpcProxy = ClientProxyFactory.create({
      transport: Transport.GRPC,
      options: {
        url: `${envs.roomsMicroserviceHost}:${envs.roomsMicroservicePort}`,
        protoPath: [
          join(__dirname, '../../../proto-files/collaborators/positions.proto'),
        ],
        package: COLLABORATORS_POSITIONS_PACKAGE_NAME,
        loader: {
          includeDirs: [join(__dirname, '../../../proto-files')],
          keepCase: true,
          enums: String,
          arrays: true,
        },
      },
    });

    return client.getService<PositionsServiceClient>(POSITIONS_SERVICE_NAME);
  },
};
