import { Provider } from '@nestjs/common';
import {
  Transport,
  ClientGrpcProxy,
  ClientProxyFactory,
} from '@nestjs/microservices';

import { envs } from 'src/config';

import {
  AMENITIES_SERVICE_NAME,
  AmenitiesServiceClient,
  ROOMS_AMENITIES_PACKAGE_NAME,
} from 'src/grpc/proto/rooms/amenities.pb';

export const AMENITIES_GRPC_CLIENT = AMENITIES_SERVICE_NAME;

export const AmenitiesGrpcProvider: Provider = {
  provide: AMENITIES_GRPC_CLIENT,
  useFactory: (): AmenitiesServiceClient => {
    const client: ClientGrpcProxy = ClientProxyFactory.create({
      transport: Transport.GRPC,
      options: {
        url: `${envs.roomsHost}:${envs.roomsPort}`,
        protoPath: './proto/rooms/amenities.proto',
        package: ROOMS_AMENITIES_PACKAGE_NAME,
        loader: {
          keepCase: true,
          enums: String,
          arrays: true,
        },
      },
    });

    return client.getService<AmenitiesServiceClient>(AMENITIES_SERVICE_NAME);
  },
};
