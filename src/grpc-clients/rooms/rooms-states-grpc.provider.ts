import {
  Transport,
  ClientGrpcProxy,
  ClientProxyFactory,
} from '@nestjs/microservices';
import { Provider } from '@nestjs/common';

import { join } from 'path';
import { envs } from 'src/config';

import {
  RoomsStatesServiceClient,
  ROOMS_STATES_SERVICE_NAME,
  ROOMS_ROOMS_STATES_PACKAGE_NAME,
} from 'src/grpc/rooms/rooms_states.pb';

export const ROOMS_STATES_GRPC_CLIENT = ROOMS_STATES_SERVICE_NAME;

export const RoomsStatesGrpcProvider: Provider = {
  provide: ROOMS_STATES_GRPC_CLIENT,
  useFactory: (): RoomsStatesServiceClient => {
    const client: ClientGrpcProxy = ClientProxyFactory.create({
      transport: Transport.GRPC,
      options: {
        url: `${envs.roomsMicroserviceHost}:${envs.roomsMicroservicePort}`,
        protoPath: [
          join(__dirname, '../../../proto-files/rooms/rooms_states.proto'),
        ],
        package: ROOMS_ROOMS_STATES_PACKAGE_NAME,
        loader: {
          includeDirs: [join(__dirname, '../../../proto-files')],
          keepCase: true,
          enums: String,
          arrays: true,
        },
      },
    });

    return client.getService<RoomsStatesServiceClient>(
      ROOMS_STATES_SERVICE_NAME,
    );
  },
};
