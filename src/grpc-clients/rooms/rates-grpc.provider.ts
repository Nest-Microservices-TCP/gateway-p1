import { Provider } from '@nestjs/common';
import {
  Transport,
  ClientGrpcProxy,
  ClientProxyFactory,
} from '@nestjs/microservices';

import { envs } from 'src/config';

import {
  RATES_SERVICE_NAME,
  RatesServiceClient,
  ROOMS_RATES_PACKAGE_NAME,
} from 'src/grpc/proto/rooms/rates.pb';

export const RATES_GRPC_CLIENT = RATES_SERVICE_NAME;

export const RatesGrpcProvider: Provider = {
  provide: RATES_GRPC_CLIENT,
  useFactory: (): RatesServiceClient => {
    const client: ClientGrpcProxy = ClientProxyFactory.create({
      transport: Transport.GRPC,
      options: {
        url: `${envs.roomsMicroserviceHost}:${envs.roomsMicroservicePort}`,
        protoPath: './proto/rooms/rates.proto',
        package: ROOMS_RATES_PACKAGE_NAME,
        loader: {
          keepCase: true,
          enums: String,
          arrays: true,
        },
      },
    });

    return client.getService<RatesServiceClient>(RATES_SERVICE_NAME);
  },
};
