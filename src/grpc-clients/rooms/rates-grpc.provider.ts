import { Provider } from '@nestjs/common';
import {
  Transport,
  ClientGrpcProxy,
  ClientProxyFactory,
} from '@nestjs/microservices';

import { join } from 'path';
import { envs } from 'src/config';

import {
  RatesServiceClient,
  RATES_SERVICE_NAME,
  ROOMS_RATES_PACKAGE_NAME,
} from 'src/grpc/rooms/rates.pb';

export const RATES_GRPC_CLIENT = RATES_SERVICE_NAME;

export const RatesGrpcProvider: Provider = {
  provide: RATES_GRPC_CLIENT,
  useFactory: (): RatesServiceClient => {
    const client: ClientGrpcProxy = ClientProxyFactory.create({
      transport: Transport.GRPC,
      options: {
        url: `${envs.roomsMicroserviceHost}:${envs.roomsMicroservicePort}`,
        protoPath: [join(__dirname, '../../../proto-files/rooms/rates.proto')],
        package: ROOMS_RATES_PACKAGE_NAME,
        loader: {
          includeDirs: [join(__dirname, '../../../proto-files')],
          keepCase: true,
          enums: String,
          arrays: true,
        },
      },
    });

    return client.getService<RatesServiceClient>(RATES_SERVICE_NAME);
  },
};
