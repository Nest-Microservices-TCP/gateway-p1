import {
  Transport,
  ClientGrpcProxy,
  ClientProxyFactory,
} from '@nestjs/microservices';
import { Provider } from '@nestjs/common';

import { envs } from 'src/config';

import {
  PositionsServiceClient,
  POSITIONS_SERVICE_NAME,
  COLLABORATORS_POSITIONS_PACKAGE_NAME,
} from 'src/grpc/proto/collaborators/positions.pb';

export const POSITIONS_GRPC_CLIENT = POSITIONS_SERVICE_NAME;

export const PositionsGrpcProvider: Provider = {
  provide: POSITIONS_GRPC_CLIENT,
  useFactory: (): PositionsServiceClient => {
    const client: ClientGrpcProxy = ClientProxyFactory.create({
      transport: Transport.GRPC,
      options: {
        url: `${envs.roomsMicroserviceHost}:${envs.roomsMicroservicePort}`,
        protoPath: './proto/collaborators/positions.proto',
        package: COLLABORATORS_POSITIONS_PACKAGE_NAME,
        loader: {
          keepCase: true,
          enums: String,
          arrays: true,
        },
      },
    });

    return client.getService<PositionsServiceClient>(POSITIONS_SERVICE_NAME);
  },
};
