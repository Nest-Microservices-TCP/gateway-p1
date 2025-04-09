import {
  Transport,
  ClientGrpcProxy,
  ClientProxyFactory,
} from '@nestjs/microservices';
import { Provider } from '@nestjs/common';

import { envs } from 'src/config';

import {
  WorkShiftsServiceClient,
  WORK_SHIFTS_SERVICE_NAME,
  COLLABORATORS_WORK_SHIFTS_PACKAGE_NAME,
} from 'src/grpc/proto-files/collaborators/work_shifts.pb';

export const WORK_SHIFTS_GRPC_CLIENT = WORK_SHIFTS_SERVICE_NAME;

export const WorkShiftsGrpcProvider: Provider = {
  provide: WORK_SHIFTS_GRPC_CLIENT,
  useFactory: (): WorkShiftsServiceClient => {
    const client: ClientGrpcProxy = ClientProxyFactory.create({
      transport: Transport.GRPC,
      options: {
        url: `${envs.roomsMicroserviceHost}:${envs.roomsMicroservicePort}`,
        protoPath: './proto/collaborators/work_shifts.proto',
        package: COLLABORATORS_WORK_SHIFTS_PACKAGE_NAME,
        loader: {
          keepCase: true,
          enums: String,
          arrays: true,
        },
      },
    });

    return client.getService<WorkShiftsServiceClient>(WORK_SHIFTS_SERVICE_NAME);
  },
};
