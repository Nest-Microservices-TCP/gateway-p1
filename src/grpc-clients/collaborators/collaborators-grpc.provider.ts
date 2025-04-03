import {
  Transport,
  ClientGrpcProxy,
  ClientProxyFactory,
} from '@nestjs/microservices';
import { Provider } from '@nestjs/common';

import { envs } from 'src/config';

import {
  CollaboratorsServiceClient,
  COLLABORATORS_SERVICE_NAME,
  COLLABORATORS_COLLABORATORS_PACKAGE_NAME,
} from 'src/grpc/proto/collaborators/collaborators.pb';

export const COLLABORATORS_GRPC_CLIENT = COLLABORATORS_SERVICE_NAME;

export const CollaboratorsGrpcProvider: Provider = {
  provide: COLLABORATORS_GRPC_CLIENT,
  useFactory: (): CollaboratorsServiceClient => {
    const client: ClientGrpcProxy = ClientProxyFactory.create({
      transport: Transport.GRPC,
      options: {
        url: `${envs.collaboratorsMicroserviceHost}:${envs.collaboratorsMicroservicePort}`,
        protoPath: './proto/collaborators/collaborators.proto',
        package: COLLABORATORS_COLLABORATORS_PACKAGE_NAME,
        loader: {
          keepCase: true,
          enums: String,
          arrays: true,
        },
      },
    });

    return client.getService<CollaboratorsServiceClient>(
      COLLABORATORS_SERVICE_NAME,
    );
  },
};
