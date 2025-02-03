import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { ROOMS_MICROSERVICE, envs } from 'src/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ROOMS_MICROSERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.roomsHost,
          port: envs.roomsPort,
        },
      },
    ]),
  ],
  exports: [
    ClientsModule.register([
      {
        name: ROOMS_MICROSERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.roomsHost,
          port: envs.roomsPort,
        },
      },
    ]),
  ],
})
export class RoomsClientMS {}
