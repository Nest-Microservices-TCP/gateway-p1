import { ClientsModule, Transport } from '@nestjs/microservices';
import { ROOMS_MS, envs } from 'src/config';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ROOMS_MS,
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
        name: ROOMS_MS,
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
