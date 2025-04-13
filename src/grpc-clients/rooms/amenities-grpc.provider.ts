import {
  Transport,
  ClientGrpcProxy,
  ClientProxyFactory,
} from '@nestjs/microservices';
import { Provider } from '@nestjs/common';

import { join } from 'path';
import { envs } from 'src/config';

import {
  AmenitiesServiceClient,
  AMENITIES_SERVICE_NAME,
  ROOMS_AMENITIES_PACKAGE_NAME,
} from 'src/grpc/rooms/amenities.pb';

export const AMENITIES_GRPC_CLIENT = AMENITIES_SERVICE_NAME;

export const AmenitiesGrpcProvider: Provider = {
  provide: AMENITIES_GRPC_CLIENT,
  useFactory: (): AmenitiesServiceClient => {
    const client: ClientGrpcProxy = ClientProxyFactory.create({
      transport: Transport.GRPC,
      options: {
        url: `${envs.roomsMicroserviceHost}:${envs.roomsMicroservicePort}`,
        protoPath: join(
          __dirname,
          '../../../proto-files/rooms/amenities.proto',
        ),
        package: ROOMS_AMENITIES_PACKAGE_NAME,
        loader: {
          includeDirs: [join(__dirname, '../../../proto-files')],
          keepCase: true,
          enums: String,
          arrays: true,
        },
      },
    });

    return client.getService<AmenitiesServiceClient>(AMENITIES_SERVICE_NAME);
  },
};
